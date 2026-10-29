import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Wi-Fi" });
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await userEvent.keyboard("{Enter}");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
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
  args: { disabled: true, label: "Wi-Fi", onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Wi-Fi" });
    await expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};
