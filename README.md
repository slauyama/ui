# @slauyama/ui

A React component library using Tailwind CSS.

## Installation

This package is published to the GitHub Package Registry. Add the following to your `.npmrc`:

```
@slauyama:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @slauyama/ui
```

## Setup

Import the library's CSS in your app's entry point:

```ts
import "@slauyama/ui/styles";
```

## Theming

The default theme is included in the styles import — no extra setup needed. To customise it, override the CSS variables in your own CSS **after** the styles import:

```ts
import "@slauyama/ui/styles";
import "./my-theme.css"; // your overrides go here
```

```css
/* my-theme.css */
:root {
  --color-ui-primary: #7c3aed;
  --radius-ui: 0.25rem;
}
```

The import order matters — your overrides must come after the library styles to take precedence.

### Available tokens

Components are styled using CSS custom properties. The full list of tokens:

### Theme tokens

| Token                      | Default   | Used in                                     |
| -------------------------- | --------- | ------------------------------------------- |
| `--color-ui-primary`       | `#64748b` | Button (primary, pill active), Link         |
| `--color-ui-primary-hover` | `#475569` | Button hover, Link hover                    |
| `--color-ui-primary-muted` | `#94a3b8` | Button inline text, Input/Select focus ring |
| `--radius-ui`              | `0.5rem`  | Button, Card, Input, Select, IconButton     |

### Dark mode

Components support dark mode via Tailwind's `dark:` variant. No extra configuration needed — they respond to the `dark` class on the `<html>` element.

## Usage

```tsx
import { Button, Input, Card } from "@slauyama/ui";

export function Example() {
  return (
    <Card className="p-6">
      <Input label="Email" placeholder="you@example.com" />
      <Button className="mt-4">Submit</Button>
    </Card>
  );
}
```
