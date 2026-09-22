# Using @slauyama/ui (Material 3 design tokens, React)

## Setup
- **No provider or root wrapper.** Every component is styled by `styles.css` alone: link it once in `<head>` (it carries the tokens, fonts and every component style). It sets `body` background/text/font from tokens, so don't override them.
- **Dark mode:** put `data-theme="dark"` on `<html>` (and `color-scheme: dark`). Light is the default with no attribute. Tokens swap automatically; never hardcode colours.
- **Fonts and icons load from Google Fonts at runtime** (Bricolage Grotesque headings, Schibsted Grotesk body, JetBrains Mono code, **Material Symbols Rounded** icons). Offline, icon ligatures show as raw text like `search`.
- **Icons are ligature-name strings**: `<Button icon="add">`, `<Icon name="search" filled />`, `leadingIcon="search"`. Use any Material Symbols name.

## Styling idiom: props for components, `var(--*)` tokens for your own layout
- Components take a `variant` prop (e.g. Button `filled|tonal|elevated|outlined|text`, Card `filled|elevated|outlined`, TextField `filled|outlined`) plus `style` / `className`.
- **Do not write Tailwind utility classes.** The stylesheet is precompiled and only contains classes the components themselves use, so new ones silently do nothing. For your own layout use inline `style` with tokens:
  - colour: `--color-primary`, `--color-on-primary`, `--color-primary-container`, `--color-secondary`, `--color-tertiary`, `--color-error`, `--color-surface`, `--color-surface-container` (`-low`/`-high`/`-highest`), `--color-on-surface`, `--color-on-surface-variant`, `--color-outline`, `--color-outline-variant`
  - shape: `--shape-corner-small|medium|large|extra-large|full`, `--shape-card`
  - elevation: `--elevation-level0` … `--elevation-level5`
  - spacing: `--spacing-1` … `--spacing-16` (4px steps), `--inset-default`
  - type: `--typescale-<role>-size|line-height|weight|font` where role is `display-*`, `headline-*`, `title-*`, `body-*`, `label-*`; families `--ref-typeface-brand|plain|mono`
  - motion: `--motion-duration-short2`, `--motion-easing-standard`
- Prefer `<Heading variant="headline-small">` and `<Text variant="body-medium" color="var(--color-on-surface-variant)">` over hand-set font sizes.
- Compound components: `Menu.Item`, `List.Item`, and `Table.Header|Body|Row|Head|Cell`.

## Where the truth lives
Read `styles.css` (it imports `_ds_bundle.css`, which holds every token and component style) before styling. Per component: `components/<group>/<Name>/<Name>.d.ts` (props) and `<Name>.prompt.md`. The prompt examples are Storybook `Story` objects (`args`/`render`): take the props and JSX from them and mount as plain JSX from `window.SlauyamaUi`.

## Example
```jsx
const { Card, Heading, Text, TextField, Button } = window.SlauyamaUi;

<Card variant="outlined" style={{ padding: 24, width: 360, display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
  <Heading as="h2" variant="headline-small">Reset password</Heading>
  <Text variant="body-medium" color="var(--color-on-surface-variant)">We'll email you a link.</Text>
  <TextField label="Email" leadingIcon="mail" supportingText="We'll never share it." />
  <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-2)" }}>
    <Button variant="text">Cancel</Button>
    <Button>Send link</Button>
  </div>
</Card>
```
