import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabDef } from "./tabs";

const tabs: TabDef[] = [
  { value: "overview", label: "Overview", icon: "dashboard" },
  { value: "details", label: "Details", icon: "info" },
  { value: "settings", label: "Settings", icon: "settings" },
];

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: { tabs, value: "overview", variant: "primary" },
};

export const Secondary: Story = {
  args: { tabs, value: "overview", variant: "secondary" },
};

export const NoIcons: Story = {
  args: {
    tabs: tabs.map((t) => ({ ...t, icon: undefined })),
    value: "overview",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("overview");
    return <Tabs tabs={tabs} value={value} onChange={setValue} />;
  },
};
