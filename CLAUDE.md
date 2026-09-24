# @slauyama/ui

Material 3-inspired React component library. Tailwind v4 + CSS custom-property
design tokens, Storybook for docs/dev, Vitest (`@storybook/addon-vitest`) runs
every story as a real browser test with axe-core a11y checks built in.

## Commands

- `npm run lint` — eslint
- `npx tsc --noEmit -p .` — typecheck
- `npx vitest run --project storybook` — full a11y + unit suite
- `npm run build` — tsup + Tailwind CSS bundle
- `npm run storybook` — dev server, port 6006

## Before submitting a PR

Use the `verify-ui-change` skill. Typecheck/lint/tests passing is not
sufficient proof a UI change actually renders correctly — check it in a
real browser.

## Conventions

- Icon names are typed via `MaterialSymbol` (from the `material-symbols` package)
- Dynamic Tailwind class strings aren't scanned by the JIT — only literal
  class strings in source. Don't build arbitrary-value classes via
  interpolation.
