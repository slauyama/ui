import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { ALL_SURFACES } from "../../surfaces";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "inline"],
    },
    color: { control: "select", options: ["default", "destructive"] },
    size: { control: "select", options: ["xs", "sm", "md"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-row gap-2">
      {ALL_SURFACES.map((surface) => (
        <Button key={surface} surface={surface}>
          {surface} Button
        </Button>
      ))}
    </div>
  ),
};
export const Primary: Story = {
  args: { variant: "primary", children: "Button" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Button" },
};

export const Inline: Story = {
  args: { variant: "inline", children: "Button" },
};

export const Disabled: Story = {
  args: { variant: "primary", children: "Button", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">XS Button</Button>
      <Button size="sm">SM Button</Button>
      <Button size="md">MD Button</Button>
    </div>
  ),
};
