# Theming @slauyama/ui with your own colours

How to give an app that consumes `@slauyama/ui` a different colour theme. This
guide lives in the repo, not the published package, and is written so an AI
assistant working in a consumer app can follow it step by step.

## How the colour tokens work

`@slauyama/ui/styles.css` defines colours in two layers of CSS custom properties:

1. **Tonal palettes** (`tokens/palette.css`): `--ref-{palette}{tone}`, for
   example `--ref-primary40`. There are six palettes: `primary`, `secondary`,
   `tertiary`, `neutral`, `neutralvariant` and `error`. Tones run from 0
   (black) to 100 (white). `neutral` has extra tones (4, 6, 12, 17, 22, 24, 87,
   92, 94, 96) for the surface containers.
2. **Colour roles** (`tokens/colors.css`): `--color-*`, for example
   `--color-primary` and `--color-surface-container`. Components only ever use
   roles. In light mode, roles point at one set of tones (`--color-primary` is
   `--ref-primary40`). Under `[data-theme="dark"]` they point at another
   (`--color-primary` is `--ref-primary80`).

Every token is declared inside the `theme` cascade layer. **Any ordinary
(unlayered) CSS rule in the app beats it**, whatever the specificity or import
order. Theming is just declaring those custom properties again in app CSS. Do
not fork or patch the package's CSS.

## Pick an approach

| Goal                                  | Override                                         | Notes                                                                                    |
| ------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Rebrand the whole app, light and dark | `--ref-*` on `:root`                             | Recommended. One block covers both modes, because the dark roles read the same palettes. |
| Tweak one or two roles                | `--color-*` on `:root` and `[data-theme="dark"]` | You must set both modes yourself.                                                        |
| Theme one section of a page           | `--color-*` on a wrapper element                 | `--ref-*` overrides **do nothing** below `:root` (see Limitations).                      |

## Steps: rebrand from a seed colour

1. **Choose a seed colour**, usually the brand's primary colour, for example
   `#0b7a5c`.

2. **Generate the palettes.** In a scratch directory outside the app:

   ```sh
   npm init -y
   npm i @material/material-color-utilities@0.3.0
   ```

   Pin 0.3.0, because 0.4.0's ESM build can't be imported by plain Node. Save
   this as `palette.mjs`:

   ```js
   import {
     argbFromHex,
     hexFromArgb,
     Hct,
     SchemeTonalSpot,
   } from "@material/material-color-utilities";

   const seed = process.argv[2];
   const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(seed)), false, 0);
   const STANDARD = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];
   const NEUTRAL = [...STANDARD, 4, 6, 12, 17, 22, 24, 87, 92, 94, 96].sort(
     (a, b) => a - b,
   );
   const palettes = [
     ["primary", scheme.primaryPalette, STANDARD],
     ["secondary", scheme.secondaryPalette, STANDARD],
     ["tertiary", scheme.tertiaryPalette, STANDARD],
     ["neutral", scheme.neutralPalette, NEUTRAL],
     ["neutralvariant", scheme.neutralVariantPalette, STANDARD],
     ["error", scheme.errorPalette, STANDARD],
   ];

   console.log(":root {");
   for (const [name, palette, tones] of palettes) {
     for (const tone of tones) {
       console.log(
         `  --ref-${name}${tone}: ${hexFromArgb(palette.tone(tone))};`,
       );
     }
   }
   console.log("}");
   ```

   Run it with `node palette.mjs "#0b7a5c" > theme.css`. The output has the
   same 94 variables as `tokens/palette.css`. To pin the other palettes to
   brand colours instead of deriving them from the seed, replace those lines
   by hand, or build each one with `TonalPalette.fromInt(argbFromHex(hex))`.

3. **Add the block to the app's CSS** as a plain rule. Don't put it inside
   `@layer`, and don't wrap it in a selector other than `:root`. Load it after
   the library stylesheet so it's easy to find:

   ```ts
   // app entry
   import "@slauyama/ui/styles.css";
   import "./theme.css";
   ```

   If the app uses Tailwind v4, `@slauyama/ui/styles.css` must still be the
   first import (it carries the font `@import`s). Keep `theme.css` unlayered.

4. **Turn on dark mode, if the app has it.** The library does not follow
   `prefers-color-scheme` by itself. Set the attribute on `<html>`:

   ```ts
   const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
   document.documentElement.dataset.theme = dark ? "dark" : "light";
   document.documentElement.style.colorScheme = dark ? "dark" : "light";
   ```

   The palette override from step 3 already covers dark mode. Don't add a
   second palette under `[data-theme="dark"]`.

5. **Check it.** Look at buttons (filled, tonal, outlined), a text field in
   focus and in error, chips, a selected nav item, a dialog and a snackbar, in
   both modes. Generated palettes keep Material's tone pairs, so on-colour text
   contrast holds. If you hand-picked any tone, check that each
   `--color-on-X` and `--color-X` pair still reaches 4.5:1.

## Steps: override individual roles

Only for small adjustments. Set the light value on `:root` and the dark value
on `[data-theme="dark"]`:

```css
:root {
  --color-primary: #0b7a5c;
  --color-on-primary: #ffffff;
}
[data-theme="dark"] {
  --color-primary: #7bd8b4;
  --color-on-primary: #003828;
}
```

Always override a role and its `on-` partner together. The roles are listed in
`tokens/colors.css`. Elevation shadows, focus rings and state layers all derive
from roles, so they follow automatically.

## Steps: theme one section of a page

Put role overrides on a class, and apply the class to a wrapper:

```css
.promo {
  --color-primary: #b3261e;
  --color-on-primary: #ffffff;
  --color-primary-container: #f9dedc;
  --color-on-primary-container: #410e0b;
}
```

## Limitations

- **`--ref-*` overrides only work on `:root`.** A role like
  `--color-primary: var(--ref-primary40)` is resolved on the element that
  declares it (`:root`), and the resolved colour is what children inherit.
  Changing `--ref-primary40` further down the tree changes nothing. Below
  `:root`, override `--color-*`.
- **`data-theme="dark"` on an inner element is only partly supported.** The
  `--color-*` roles flip, but the semantic aliases in `tokens/colors.css`
  (`--surface-card`, `--text-muted`, `--border-hairline` and others) were
  resolved at `:root` and keep their light values. Put `data-theme` on `<html>`.
- **Typography, shape and motion** work the same way. Override
  `--ref-typeface-*`, `--shape-*` or `--motion-*` on `:root`; see the matching
  file in `tokens/`.
