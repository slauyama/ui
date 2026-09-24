---
name: verify-ui-change
description: Verify a component/UI change in this repo (@slauyama/ui) actually works before calling it done — typecheck, lint, the Storybook/Vitest a11y+unit suite, a build, and a real-browser check via Storybook + Playwright. Use after editing any component's markup, styles, tokens, or behavior. Passing tsc/lint alone is not enough — this repo has repeatedly shipped changes that compiled fine but rendered wrong (missing border notches, no visible glyphs, misaligned labels) until actually viewed in a browser.
---

Run these in order. Don't skip the browser step — several real bugs this
session (a defeated CSS border-notch, an invalid icon ligature name, a
theme/CDN font swap) only showed up when actually rendered, not in
tsc/lint/tests.

## 1. Typecheck, lint, unit/a11y suite

```
npx tsc --noEmit -p .
npm run lint
npx vitest run --project storybook
```

The vitest run turns every `*.stories.tsx` into a real test (rendered in
headless Chromium, `@storybook/addon-a11y` runs axe-core on each). Expect
all files/tests to pass — currently ~42 files. If the count is _lower_ than
last known-good, a story likely got dropped; don't just accept a smaller
passing number as clean.

## 2. Build

```
rm -rf dist && npm run build
```

Confirms `tsup` (JS + `.d.ts`) and the Tailwind CSS bundle both compile.
If you touched anything font/asset-related, check `dist/` actually contains
what it should (e.g. `material-symbols-rounded.woff2` — the CSS bundler
rewrites `@import`s but does not copy binary assets on its own).

## 3. Real-browser check

```
npx kill-port 6006 >/dev/null 2>&1; npm run storybook >/tmp/storybook.log 2>&1 &
disown
sleep 6
```

Then use the Playwright MCP tools, not raw `curl`/assumptions about markup:

- **Find the real story id first**: `curl -s http://localhost:6006/index.json`
  and grep the `entries` keys. Story ids shift (renames, merges) — a
  hardcoded id from a previous run will intermittently 404 with
  `NoStoryMatchError`. This bit repeatedly in this session.
- **Navigate straight to the story iframe**, not the manager UI — simpler
  DOM, no nested-iframe indirection for `browser_evaluate`/screenshots:
  `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story`
- **After triggering state via `browser_evaluate`** (`.focus()`, `.click()`),
  **wait before reading the DOM or screenshotting** — React's re-render
  doesn't flush synchronously within the same evaluate call:
  ```js
  el.focus();
  await new Promise((r) => setTimeout(r, 100));
  // now read/screenshot
  ```
  Reading immediately reads stale DOM and produces false negatives (looked
  like a real bug once this session; wasn't).
- **Take an actual screenshot and look at it** (via the Read tool) for
  visual changes — computed styles / bounding rects can look "correct" while
  the real paint is broken (e.g. a `<legend>` with correct layout dimensions
  but zero visible ink still gets no border notch — this is a real, tested
  browser behavior, not something `getBoundingClientRect()` will catch).
- All output should belong in the .playwright-mcp/ folder.
- For anything with light-dismiss, popovers, or synthetic-feeling
  interactions, prefer genuine trusted input (real `.click()`/`.focus()` via
  `browser_evaluate`, or Playwright mouse/keyboard actions) over
  `dispatchEvent(new Event(...))` — untrusted synthetic events silently
  don't trigger some native/React behavior.

Stop the server when done: `pkill -f "storybook dev"`.

## 4. Report

State what you actually saw in the screenshot, not just that commands
exited 0. If something looks off, say so before claiming the change works.

## CLean Up

If you no longer need a screenshot or a console log. Delete the file.
