import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
  component: Link,
  argTypes: {
    variant: { control: "select", options: ["text", "icon"] },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Text: Story = {
  args: { href: "#", variant: "text", children: "Visit documentation" },
};

export const Icon: Story = {
  args: { href: "#", variant: "icon", title: "GitHub", children: "★" },
};
