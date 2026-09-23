import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./chip";

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    variant: {
      control: "select",
      options: ["assist", "filter", "input", "suggestion"],
    },
    elevated: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Chip variant="assist" label="Assist" icon="info" />
      <Chip variant="filter" label="Filter" icon="tune" />
      <Chip variant="input" label="Input" onRemove={() => {}} />
      <Chip variant="suggestion" label="Suggestion" />
    </div>
  ),
};

export const Default: Story = {
  args: { label: "Assist chip", icon: "info" },
};

export const FilterSelected: Story = {
  render: function FilterSelectedStory() {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        variant="filter"
        label="Wi-Fi"
        icon="wifi"
        selected={selected}
        onClick={() => setSelected((s) => !s)}
      />
    );
  },
};

export const WithAvatar: Story = {
  args: {
    variant: "input",
    label: "Ada Lovelace",
    avatar: "https://i.pravatar.cc/40",
    onRemove: () => {},
  },
};

export const Elevated: Story = {
  args: { label: "Elevated", icon: "star", elevated: true },
};

export const Disabled: Story = {
  args: { label: "Disabled", icon: "block", disabled: true },
};
