#!/usr/bin/env node
// Forwards GitHub webhooks for this repo to localhost with `gh webhook forward`
// and runs `claude -p` in a dedicated clone for each issue or PR the owner
// opens, comments on or reviews. See README.md in this folder.

import { spawn, spawnSync } from "node:child_process";
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = process.env.LISTENER_REPO ?? "slauyama/ui";
const OWNER = REPO.split("/")[0];
const PORT = Number(process.env.LISTENER_PORT ?? 8787);
const WORKDIR = resolve(
  process.env.LISTENER_WORKDIR ?? join(HERE, "../../../ui-claude"),
);
const STATE_DIR =
  process.env.LISTENER_STATE_DIR ??
  join(homedir(), ".cache", "ui-github-listener");
const DRY_RUN = process.env.DRY_RUN === "1";
const MARKER = "🤖 Claude";
const EVENTS = [
  "issues",
  "issue_comment",
  "pull_request_review",
  "pull_request_review_comment",
];
const JOB_TIMEOUT_MS = 60 * 60 * 1000;
const ALLOWED_TOOLS = [
  "Read",
  "Edit",
  "Write",
  "Glob",
  "Grep",
  "Skill",
  "Bash(npm *)",
  "Bash(npx *)",
  "Bash(git *)",
  "Bash(gh *)",
  "Bash(curl -s http://localhost:6006/*)",
  "Bash(pkill -f *)",
  "Bash(rm -rf dist)",
  "Bash(rm -f .playwright-mcp/*)",
  "mcp__plugin_playwright_playwright",
];

const secret = randomBytes(32).toString("hex");
const statePath = join(STATE_DIR, "state.json");
mkdirSync(join(STATE_DIR, "logs"), { recursive: true });
const state = existsSync(statePath)
  ? JSON.parse(readFileSync(statePath, "utf8"))
  : { since: new Date().toISOString(), seen: [], lockHash: null };
const seen = new Set(state.seen);

/** Threads waiting to run, keyed by issue/PR number. Events for a thread that's already queued are merged into it. */
const queue = new Map();
let running = null;
let forwarder = null;
let stopping = false;

function log(...args) {
  console.log(new Date().toLocaleTimeString(), ...args);
}

function saveState() {
  state.seen = [...seen].slice(-2000);
  writeFileSync(statePath, JSON.stringify(state, null, 2));
}

function gh(args) {
  const r = spawnSync("gh", args, { encoding: "utf8" });
  if (r.status !== 0)
    throw new Error(`gh ${args.join(" ")}: ${r.stderr.trim()}`);
  return r.stdout;
}

function ghJson(path) {
  return JSON.parse(gh(["api", path]));
}

function run(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit" });
  if (r.status !== 0)
    throw new Error(`${cmd} ${args.join(" ")} exited ${r.status}`);
}

/** Turns a webhook (or a catch-up API row shaped like one) into a queue entry, or null if Claude shouldn't act on it. */
function toEvent(name, p) {
  if (p.sender?.login !== OWNER) return null;
  if (name === "issues" && p.action === "opened") {
    return {
      id: `i${p.issue.id}`,
      thread: p.issue.number,
      isPR: false,
      at: p.issue.created_at,
      body: p.issue.body,
      what: `opened issue #${p.issue.number}: ${p.issue.title}`,
      url: p.issue.html_url,
    };
  }
  if (name === "issue_comment" && p.action === "created") {
    return {
      id: `c${p.comment.id}`,
      thread: p.issue.number,
      isPR: Boolean(p.issue.pull_request),
      at: p.comment.created_at,
      body: p.comment.body,
      what: `commented on #${p.issue.number}`,
      url: p.comment.html_url,
    };
  }
  if (name === "pull_request_review_comment" && p.action === "created") {
    return {
      id: `r${p.comment.id}`,
      thread: p.pull_request.number,
      isPR: true,
      at: p.comment.created_at,
      body: p.comment.body,
      what: `left a review comment on ${p.comment.path} in PR #${p.pull_request.number}`,
      url: p.comment.html_url,
    };
  }
  if (
    name === "pull_request_review" &&
    p.action === "submitted" &&
    p.review.body
  ) {
    return {
      id: `v${p.review.id}`,
      thread: p.pull_request.number,
      isPR: true,
      at: p.review.submitted_at,
      body: p.review.body,
      what: `submitted a review (${p.review.state.toLowerCase()}) on PR #${p.pull_request.number}`,
      url: p.review.html_url,
    };
  }
  return null;
}

function enqueue(event) {
  if (!event || seen.has(event.id) || event.body?.includes(MARKER)) return;
  seen.add(event.id);
  if (event.at > state.since) state.since = event.at;
  saveState();
  const job = queue.get(event.thread) ?? {
    thread: event.thread,
    isPR: event.isPR,
    events: [],
  };
  job.events.push(event);
  queue.set(event.thread, job);
  log(`queued: ${event.what} ${event.url}`);
  void drain();
}

/** Picks up anything the owner wrote while the forwarder wasn't connected. */
function catchUp() {
  const since = state.since;
  const after = (t) => t > since;
  try {
    for (const issue of ghJson(
      `repos/${REPO}/issues?state=all&creator=${OWNER}&since=${since}&per_page=100`,
    )) {
      if (!issue.pull_request && after(issue.created_at)) {
        enqueue(
          toEvent("issues", { action: "opened", sender: issue.user, issue }),
        );
      }
    }
    for (const comment of ghJson(
      `repos/${REPO}/issues/comments?since=${since}&per_page=100`,
    )) {
      if (!after(comment.created_at)) continue;
      const number = Number(comment.issue_url.split("/").pop());
      const issue = ghJson(`repos/${REPO}/issues/${number}`);
      enqueue(
        toEvent("issue_comment", {
          action: "created",
          sender: comment.user,
          comment,
          issue,
        }),
      );
    }
    for (const comment of ghJson(
      `repos/${REPO}/pulls/comments?since=${since}&per_page=100`,
    )) {
      if (!after(comment.created_at)) continue;
      const number = Number(comment.pull_request_url.split("/").pop());
      enqueue(
        toEvent("pull_request_review_comment", {
          action: "created",
          sender: comment.user,
          comment,
          pull_request: { number },
        }),
      );
    }
    for (const pr of ghJson(`repos/${REPO}/pulls?state=open&per_page=100`)) {
      for (const review of ghJson(
        `repos/${REPO}/pulls/${pr.number}/reviews?per_page=100`,
      )) {
        if (after(review.submitted_at ?? "")) {
          enqueue(
            toEvent("pull_request_review", {
              action: "submitted",
              sender: review.user,
              review,
              pull_request: pr,
            }),
          );
        }
      }
    }
  } catch (err) {
    log(`catch-up failed: ${err.message}`);
  }
}

function prepareClone() {
  if (!existsSync(WORKDIR)) {
    log(`cloning ${REPO} into ${WORKDIR}`);
    run("gh", ["repo", "clone", REPO, WORKDIR]);
  }
  run("git", ["fetch", "origin", "--prune"], WORKDIR);
  run("git", ["checkout", "-f", "-B", "master", "origin/master"], WORKDIR);
  run("git", ["clean", "-fd"], WORKDIR);
  const lockHash = createHash("sha256")
    .update(readFileSync(join(WORKDIR, "package-lock.json")))
    .digest("hex");
  if (lockHash !== state.lockHash) {
    run("npm", ["ci"], WORKDIR);
    run("npx", ["playwright", "install", "chromium"], WORKDIR);
    state.lockHash = lockHash;
    saveState();
  }
}

function buildPrompt(job) {
  const lines = job.events
    .map((e) => `- ${OWNER} ${e.what}: ${e.url}`)
    .join("\n");
  return readFileSync(join(HERE, "prompt.md"), "utf8")
    .replaceAll("{{repo}}", REPO)
    .replaceAll("{{owner}}", OWNER)
    .replaceAll("{{thread}}", `${job.isPR ? "PR" : "issue"} #${job.thread}`)
    .replaceAll("{{events}}", lines);
}

function runClaude(job, prompt) {
  const logPath = join(
    STATE_DIR,
    "logs",
    `${new Date().toISOString().replaceAll(":", "-")}-${job.thread}.log`,
  );
  log(`running Claude on #${job.thread}, log: ${logPath}`);
  return new Promise((done) => {
    const out = createWriteStream(logPath);
    const child = spawn(
      "claude",
      [
        "-p",
        prompt,
        "--permission-mode",
        "acceptEdits",
        "--allowedTools",
        ...ALLOWED_TOOLS,
      ],
      { cwd: WORKDIR, stdio: ["ignore", "pipe", "pipe"] },
    );
    running = child;
    child.stdout.pipe(out);
    child.stderr.pipe(out);
    const timer = setTimeout(() => {
      log(
        `#${job.thread} hit the ${JOB_TIMEOUT_MS / 60000} minute limit, stopping it`,
      );
      child.kill("SIGTERM");
    }, JOB_TIMEOUT_MS);
    child.on("exit", (code) => {
      clearTimeout(timer);
      running = null;
      log(`Claude finished #${job.thread} (exit ${code})`);
      done();
    });
  });
}

async function drain() {
  if (running || stopping || queue.size === 0) return;
  const [thread, job] = queue.entries().next().value;
  queue.delete(thread);
  const prompt = buildPrompt(job);
  if (DRY_RUN) {
    log(`DRY_RUN, would run Claude with:\n${prompt}`);
  } else {
    running = true;
    try {
      prepareClone();
      await runClaude(job, prompt);
    } catch (err) {
      log(`#${thread} failed: ${err.message}`);
    }
    running = null;
  }
  void drain();
}

function verified(req, raw) {
  const sig = req.headers["x-hub-signature-256"];
  if (typeof sig !== "string") return false;
  const expected = Buffer.from(
    `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`,
  );
  const given = Buffer.from(sig);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

const server = createServer((req, res) => {
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const raw = Buffer.concat(chunks);
    if (req.method !== "POST" || !verified(req, raw)) {
      res.writeHead(401).end();
      return;
    }
    res.writeHead(202).end();
    const name = req.headers["x-github-event"];
    if (name === "ping") {
      log("GitHub is connected and forwarding events");
      return;
    }
    enqueue(toEvent(name, JSON.parse(raw.toString("utf8"))));
  });
});

function startForwarder() {
  forwarder = spawn(
    "gh",
    [
      "webhook",
      "forward",
      `--repo=${REPO}`,
      `--events=${EVENTS.join(",")}`,
      `--url=http://127.0.0.1:${PORT}/webhook`,
      `--secret=${secret}`,
    ],
    // Its own process group, so shutdown() can signal the gh-webhook binary
    // that gh spawns too. That binary deletes the repo webhook when it exits.
    { stdio: ["ignore", "pipe", "pipe"], detached: true },
  );
  forwarder.stdout.on("data", (d) => process.stdout.write(`[gh] ${d}`));
  forwarder.stderr.on("data", (d) => {
    process.stdout.write(`[gh] ${d}`);
    if (String(d).includes("Hook already exists")) {
      log(
        "another forwarder is already attached to this repo; stop it or delete the webhook in the repo's settings",
      );
    }
  });
  forwarder.on("exit", (code) => {
    forwarder = null;
    if (stopping) {
      process.exit(0);
    }
    log(`forwarder exited (${code}), reconnecting in 15s`);
    setTimeout(() => {
      catchUp();
      startForwarder();
    }, 15000);
  });
}

function shutdown() {
  if (stopping) return;
  stopping = true;
  log("stopping");
  if (running && running !== true) running.kill("SIGTERM");
  server.close();
  if (!forwarder) process.exit(0);
  process.kill(-forwarder.pid, "SIGINT");
  setTimeout(() => process.exit(0), 10000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

server.listen(PORT, "127.0.0.1", () => {
  log(
    `listening on 127.0.0.1:${PORT} for ${REPO}; Claude works in ${WORKDIR}${DRY_RUN ? " (dry run)" : ""}`,
  );
  catchUp();
  startForwarder();
});
