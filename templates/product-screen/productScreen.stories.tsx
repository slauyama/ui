import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductScreen } from "./ProductScreen";

/**
 * Desktop app shell template, rebuilt as a real .tsx composition of this library's components.
 * Compare with ProductScreen.dc.html in this same folder, the Facet original — a Claude Design
 * `.dc.html` template that only runs inside Claude Design's own preview runtime.
 */
const meta = {
  title: "Templates/Product screen",
  component: ProductScreen,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProductScreen>;
export default meta;

type Story = StoryObj<typeof ProductScreen>;

export const Default: Story = {};
