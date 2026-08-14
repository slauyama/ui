import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./textArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

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
