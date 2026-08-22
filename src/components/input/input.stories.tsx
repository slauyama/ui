import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
};

export const WithPrefix: Story = {
  args: { label: "Amount", prefix: "$", placeholder: "0.00" },
};

export const Disabled: Story = {
  args: { label: "Email", placeholder: "you@example.com", disabled: true },
};

export const Text: Story = {
  render: (args) => <Input.Text {...args} />,
  args: { label: "Name", placeholder: "Jane Doe" },
};

export const Date: Story = {
  render: (args) => <Input.Date {...args} />,
  args: { label: "Date of birth" },
};
