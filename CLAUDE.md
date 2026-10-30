# @slauyama/ui

Material 3-inspired React component library. Tailwind v4 + CSS custom-property
design tokens, Storybook for docs/dev, Vitest (`@storybook/addon-vitest`) runs
every story as a real browser test with axe-core a11y checks built in.

## Commands

- `npm run lint` — eslint
- `npm run typecheck` — typecheck
- `npm test` — every Vitest project: `storybook` (each story as an a11y +
  interaction test) and `unit` (React Testing Library tests in
  `components/**/*.test.tsx` and `hooks/*.test.ts`, run in real Chromium with
  the shipped CSS)
- `npm run test:unit` — just the RTL tests
- `npm run build` — tsup + Tailwind CSS bundle
- `npm run storybook` — dev server, port 6006

## Comments

Comments should be used sparingly. The code should mostly speak for itself. We should reserve comments for complicated code routes or exceptions. We do not need to record decisions made in the past as a comment.

## Before submitting a PR

Use the `verify-ui-change` skill. Typecheck/lint/tests passing is not
sufficient proof a UI change actually renders correctly — check it in a
real browser.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, both test projects and the
build on every PR into `master`, and the release workflow runs it again before
publishing. A new component needs a `*.test.tsx` beside it.

## Releasing

Merging a PR into `master` with a `patch` / `minor` / `major` label bumps the
version, publishes to GitHub Packages, and deploys Storybook
(`.github/workflows/on_pr_merged.yml`). An unlabeled PR publishes nothing, so
always label it.

Consumers: `slauyama/personal-tracker` (sibling checkout `../personal-tracker`). After a release, bump
`@slauyama/ui` there (its `upstream-ui-change` skill covers this).

## Theming

`docs/theming.md` is the guide for giving a consumer app its own colours
(palette generation, dark mode, scoped themes, limitations). Use it when
helping a consumer theme the library. It is not shipped in the package.

## Conventions

- Icon names are typed via `MaterialSymbol` (from the `material-symbols` package)
- Dynamic Tailwind class strings aren't scanned by the JIT — only literal
  class strings in source. Don't build arbitrary-value classes via
  interpolation.
