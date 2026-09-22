# Catalog site kit

A recreation of the documentation-site surface that a component library like this one ships with. Structure, layout and page furniture follow `catalog/` in [material-components/material-web](https://github.com/material-components/material-web) (nav drawer of pill destinations, sticky search row, 980px prose column, bordered figure blocks, outlined data tables, rounded code blocks).

Two parallel versions live here, kept apart because they'd otherwise share filenames:

- **This folder** (`CatalogShell.jsx` and friends): the Facet original, rebuilt on Facet tokens and its own `_ds_bundle.js` component bundle — a raw browser-babel page, viewable only inside Claude Design or by opening `index.html` directly.
- **`tsx/`**: a real `.tsx` port composed of this repo's own components and tokens, rendered live in Storybook under **UI Kits → Catalog site**.

## Screens

| File | Screen | Composes |
| --- | --- | --- |
| `CatalogShell` | App frame: drawer, sticky search row, theme toggle | NavigationDrawer, SearchBar, IconButton, Snackbar |
| `HomeScreen` | Overview: display hero, palette block, component index grid | Button, Card, Chip, ChipSet, Icon, Divider |
| `ComponentScreen` | Docs page: header, secondary tabs, live figure, API table, code | Tabs, Card, List, TextField, Chip, NavigationBar, Fab, Table |
| `ThemeScreen` | Theming: seed swatches, live preview panel | Switch, Slider, SegmentedButton, Select, Checkbox, Card, Button |

## Interactions that work

- Drawer destinations switch pages and reset scroll.
- The theme toggle sets `data-theme="dark"` on `<html>`, which is the only thing needed to flip the whole kit.
- Component page tabs switch between Usage, API and Tokens.
- Filter chips, switches, sliders and the segmented control all hold state.

## Known gaps

- Search is presentational; there is no index behind it.
- The "Export theme" button is inert.
