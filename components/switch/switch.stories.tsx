import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    icons: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "Wi-Fi" },
};

export const Selected: Story = {
  args: { selected: true, label: "Wi-Fi" },
};

export const WithIcons: Story = {
  args: { selected: true, icons: true, label: "Wi-Fi" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Wi-Fi" },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Switch selected={selected} onChange={setSelected} icons label="Wi-Fi" />
    );
  },
};
