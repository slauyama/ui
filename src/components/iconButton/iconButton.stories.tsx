import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./iconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { children: "✕" },
};

export const Disabled: Story = {
  args: { children: "✕", disabled: true },
};
