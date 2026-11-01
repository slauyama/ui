# GitHub listener

Runs Claude Code on this Mac whenever the repo owner opens an issue, comments
on an issue or PR, or submits a PR review on `slauyama/ui`.

```sh
npm run claude:listen   # Ctrl-C to stop
```

## How it works

1. `gh webhook forward` (the `cli/gh-webhook` extension) adds a temporary
   webhook to the repo. GitHub relays its events over a websocket to
   `127.0.0.1:8787`. You don't need a public URL or an open port. The webhook
   is deleted when the listener stops.
2. `listener.mjs` checks each event's signature against a secret generated
   at startup. It keeps events sent by the owner and skips anything signed
   "🤖 Claude".
3. Events are queued per issue or PR, and Claude handles one at a time. For
   each one, `../ui-claude` (a clone only Claude uses) is reset to
   `origin/master`. Then `claude -p` runs with [`prompt.md`](prompt.md) and a
   fixed list of allowed tools. `npm ci` reruns whenever `package-lock.json`
   changes.
4. When it starts, and whenever the forwarder reconnects, it catches up on
   anything the owner wrote since the last event it saw, so comments made
   while it was off aren't lost.

State and per-run logs live in `~/.cache/ui-github-listener/`.

## Setup

```sh
gh extension install cli/gh-webhook
```

Your existing `gh` login is enough: its `repo` scope covers repo webhooks.

## Options

| Variable             | Default                       |                                            |
| -------------------- | ----------------------------- | ------------------------------------------ |
| `DRY_RUN=1`          | off                           | Print the prompt instead of running Claude |
| `LISTENER_PORT`      | `8787`                        | Local port that receives the events        |
| `LISTENER_WORKDIR`   | `../ui-claude`                | Clone Claude works in                      |
| `LISTENER_STATE_DIR` | `~/.cache/ui-github-listener` | State and logs                             |

## Limits

- GitHub supports webhook forwarding for development, not production. Only one
  forwarder can be attached to a repo at a time; a second one fails with
  "Hook already exists".
