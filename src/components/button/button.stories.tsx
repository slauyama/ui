import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "pill", "inline"],
    },
    color: { control: "select", options: ["default", "destructive"] },
    size: { control: "select", options: ["none", "xs", "sm", "md"] },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Button" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Button" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Button" },
};

export const Pill: Story = {
  args: { variant: "pill", children: "Button" },
};

export const Inline: Story = {
  args: { variant: "inline", children: "Button" },
};

export const Destructive: Story = {
  args: { variant: "primary", color: "destructive", children: "Delete" },
};

export const Disabled: Story = {
  args: { variant: "primary", children: "Button", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
    </div>
  ),
};
