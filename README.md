# @slauyama/ui

A React component library with Tailwind CSS.

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

Components are styled using CSS custom properties. Override these variables in your own CSS to match your project's design:

```css
:root {
  --color-ui-primary: #7c3aed;       /* primary color */
  --color-ui-primary-hover: #6d28d9; /* primary hover state */
  --color-ui-primary-muted: #a78bfa; /* muted / focus ring */
  --radius-ui: 0.375rem;             /* border radius */
}
```

### Theme tokens

| Token | Default | Used in |
|---|---|---|
| `--color-ui-primary` | `#64748b` | Button (primary, pill active), Link |
| `--color-ui-primary-hover` | `#475569` | Button hover, Link hover |
| `--color-ui-primary-muted` | `#94a3b8` | Button inline text, Input/Select focus ring |
| `--radius-ui` | `0.5rem` | Button, Card, Input, Select, IconButton |

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
