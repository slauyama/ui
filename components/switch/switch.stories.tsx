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
  render: () => {
    const [selected, setSelected] = useState(false);
    return <Switch selected={selected} onChange={setSelected} label="Wi-Fi" />;
  },
};

export const Selected: Story = {
  render: () => {
    const [selected, setSelected] = useState(true);
    return <Switch selected={selected} onChange={setSelected} label="Wi-Fi" />;
  },
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <Switch selected={selected} onChange={setSelected} icons label="Wi-Fi" />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Wi-Fi" },
};
