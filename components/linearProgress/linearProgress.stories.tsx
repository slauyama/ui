import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinearProgress } from "./linearProgress";

const meta: Meta<typeof LinearProgress> = {
  component: LinearProgress,
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Default: Story = {
  args: { value: 0.4, label: "Upload progress" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <LinearProgress {...args} />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Loading" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <LinearProgress {...args} />
    </div>
  ),
};
