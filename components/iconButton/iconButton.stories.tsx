import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./iconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  argTypes: {
    variant: { control: "select", options: ["standard", "filled", "tonal", "outlined"] },
    size: { control: "select", options: ["small", "medium"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { icon: "settings", label: "Settings" },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton icon="settings" label="Settings" variant="standard" />
      <IconButton icon="settings" label="Settings" variant="filled" />
      <IconButton icon="settings" label="Settings" variant="tonal" />
      <IconButton icon="settings" label="Settings" variant="outlined" />
    </div>
  ),
};

export const Toggle: Story = {
  render: function ToggleStory() {
    const [selected, setSelected] = useState(false);
    return (
      <IconButton
        icon="favorite"
        selectedIcon="favorite"
        label="Favorite"
        selected={selected}
        onClick={() => setSelected((s) => !s)}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton icon="settings" label="Settings" size="small" />
      <IconButton icon="settings" label="Settings" size="medium" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { icon: "settings", label: "Settings", disabled: true },
};
