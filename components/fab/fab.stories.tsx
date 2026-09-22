import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fab } from "./fab";

const meta: Meta<typeof Fab> = {
  component: Fab,
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    color: { control: "select", options: ["primary", "secondary", "tertiary", "surface"] },
    lowered: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Default: Story = {
  args: { icon: "add" },
};

export const Extended: Story = {
  args: { icon: "add", label: "Compose" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Fab icon="edit" size="small" />
      <Fab icon="edit" size="medium" />
      <Fab icon="edit" size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Fab icon="edit" color="primary" />
      <Fab icon="edit" color="secondary" />
      <Fab icon="edit" color="tertiary" />
      <Fab icon="edit" color="surface" />
    </div>
  ),
};

export const Lowered: Story = {
  args: { icon: "edit", lowered: true },
};
