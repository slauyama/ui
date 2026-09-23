import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircularProgress } from "./circularProgress";

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  argTypes: {
    size: { control: "number" },
    strokeWidth: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: { indeterminate: true, label: "Loading" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {[24, 48, 72].map((size) => (
        <CircularProgress key={size} value={0.6} size={size} label="Loading" />
      ))}
    </div>
  ),
};
