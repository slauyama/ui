import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "Message", placeholder: "Write something..." },
};

export const Disabled: Story = {
  args: {
    label: "Message",
    placeholder: "Write something...",
    disabled: true,
  },
};
