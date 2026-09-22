# design-sync notes: @slauyama/ui

Shape: storybook (`.storybook/` at repo root). Package `@slauyama/ui`, global `window.SlauyamaUi`, 33 components, entry `dist/index.js` (own source repo: pass `--entry dist/index.js --node-modules <repo>/node_modules`). Rebuild `dist/` first (`npm run build`), then rebuild the reference storybook only when stories/DS source change: `npx storybook build -c .storybook -o "$PWD/.design-sync/sb-reference"`.

Target project: "Personal Material Design" (`projectId` pinned in config; the original hand-authored Facet system this library was migrated from). First upload 2026-09-21 by explicit user choice: replaced everything EXCEPT `ui_kits/` and `templates/`, which were kept on purpose. Old Facet root files (category `components/<group>/*.jsx`, `tokens/`, `guidelines/`, `SKILL.md`, `github.md`, `readme.md`, `thumbnail.html`, `_adherence.oxlintrc.json`) were deleted; `_ds_manifest.json` and `.thumbnail` are app-managed, left alone. A full copy of the original project lives in gitignored `input/Personal Material Design/`.
- **Kept kits are known-broken:** `ui_kits/{catalog,mobile}` and `templates/*` load root `styles.css` + `_ds_bundle.js`, use the `FacetDesignSystem_d4e8f5` global and `--fx-sys-*`/`--fx-ref-*` tokens. The synced bundle exposes `window.SlauyamaUi` with `--color-*` tokens, so they render unstyled/undefined until ported (user accepted this). Porting = swap global + token names + Facet-shaped props (e.g. `Chip variant="filter" label`, `NavigationBar items`).
- Because the project was non-empty with no anchor, this run took the atomic upload path; deletes were hand-reviewed from `list_files` (no `.sync-diff.json` deletePaths to copy). Later syncs are anchored (`_ds_sync.json` in the project).

## Fixes
- Story titles are `Components/<lowerCamel>` (e.g. `Components/chipSet`) but exports are PascalCase: `cfg.titleMap` maps all 33. Foundations stories (`Colors`, `Motion`, `Shape`, `Spacing`, `States`, `Type`) are documentation pages, not components: mapped to `null`. **New components need a titleMap entry** (symptom: `[TITLE_UNMAPPED]`).
- `Menu` and `Dialog` each have a `Closed` story that renders `null` on purpose: skipped via `overrides.<Name>.skip` (validate flagged `[RENDER] root empty`).
- `Dialog` renders a `fixed inset-0` scrim. The card/capture wrapper is auto-height, so the scrim collapsed to ~35px and clipped the panel. Owned `.design-sync/previews/Dialog.tsx` wraps each story in a 400px-tall `transform` box (containing block for fixed descendants); plus `cardMode: single`, `primaryStory: Default`, `viewport: 640x400`. [GENERAL] any overlay component using `position: fixed` in a preview needs the same sized box.
- `cardMode: column` on Accordion, SearchBar, Table, Tooltip, TopAppBar (`[GRID_OVERFLOW] wide`).

## Known validate warnings (not defects)
- `[RENDER_THIN] CircularProgress`: thin SVG ring, no text; it renders correctly (graded match).
- `[RENDER_THIN] NavigationBar: variants render identically`: Default and Interactive stories are the same markup.
- `[FONT_REMOTE]`: fonts (Bricolage Grotesque, Schibsted Grotesk, JetBrains Mono, Material Symbols Rounded) are Google Fonts `@import`s, not shipped in the package. Previews need network; verified in this run.

## Grading notes
- `Chip` "With Avatar" and `SearchBar` "With Avatar" use `https://i.pravatar.cc/...`, which serves a random face per request: the face differs between panels every capture; layout identical. Graded match.
- `Dialog` "Escape To Close" and `Slider` "Keyboard Control" have `play()` functions. Storybook's reference shows the post-interaction state; previews show the initial state (play is not run). Graded `close`, not fixable by design.
- 33/33 components graded; 31 fully `match`, 2 `close` (above). Primary story image-judged for the batch components, the rest read from the same sheets.

## Re-sync risks
- No provider is needed: `.storybook/preview.tsx` only sets `data-theme` on `<html>` from a toolbar global. `cfg.provider` is unset. If a real provider is ever added, distill it into `cfg.provider`. Dark theme is verified only by reading tokens (`[data-theme=dark]`), never rendered in compare (storybook defaults to the OS scheme, light in the capture browser).
- `overrides.Dialog.viewport` (640x400) is part of the grade contract; changing it re-grades Dialog. The owned Dialog preview's 400px box is tied to that viewport.
- Story cap: compare defaults to 6 stories per component; the last run used `--max-stories 10` so TextField (10) and List (8) tails were graded. Re-run with the same flag.
- Sources live at the repo root (`components/`, `tokens/`, `index.ts`); the old `src/` tree was removed in the Facet migration, and `dist/` is built from root `index.ts`.
- `conventions.md` names tokens/props verified against the 2.5.0 build; re-validate after token renames.
