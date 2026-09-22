import type { Meta, StoryObj } from "@storybook/react-vite";
import { MobileApp } from "./MobileApp";

/**
 * Compact-width app kit: app bars, search, lists, FAB, bottom nav, all on this library's own
 * components. Compare with the Facet original (`MobileApp.jsx` and friends in this same folder),
 * which runs Facet's reference bundle in-browser rather than importing a package.
 */
const meta = {
  title: "UI Kits/Mobile app",
  component: MobileApp,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MobileApp>;
export default meta;

type Story = StoryObj<typeof MobileApp>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-105 h-220 max-h-[90vh] rounded-[36px] overflow-hidden shadow-(--elevation-level3) border-8 border-(--color-surface-container-highest)">
        <Story />
      </div>
    ),
  ],
};
