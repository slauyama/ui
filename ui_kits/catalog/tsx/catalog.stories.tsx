import type { Meta, StoryObj } from "@storybook/react-vite";
import { CatalogShell } from "./CatalogShell";

/**
 * A recreation of the documentation-site surface a component library like this one ships with,
 * built on this library's own real components and tokens. Compare with the Facet original
 * (`CatalogShell.jsx` and friends in the parent ui_kits/catalog/ folder, kept apart so their
 * shared filenames can't collide with these), which runs Facet's reference bundle in-browser
 * rather than importing a package.
 */
const meta = {
  title: "UI Kits/Catalog site",
  component: CatalogShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CatalogShell>;
export default meta;

type Story = StoryObj<typeof CatalogShell>;

export const Default: Story = {};
