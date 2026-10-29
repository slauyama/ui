import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "Loading",
    });
    await expect(bar).not.toHaveAttribute("aria-valuenow");
  },
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

export const WithText: Story = {
  args: { value: 0.6, label: "Upload", children: "60%" },
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "Upload",
    });
    await expect(bar).toHaveAttribute("aria-valuenow", "0.6");
    await expect(bar).toHaveAttribute("aria-valuemin", "0");
    await expect(bar).toHaveAttribute("aria-valuemax", "1");
    await expect(bar).toHaveAttribute("aria-valuetext", "60%");
    await expect(bar).toHaveTextContent("60%");
  },
};

export const TextSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <CircularProgress value={3} max={5} size={40} label="Steps">
        3/5
      </CircularProgress>
      <CircularProgress value={0.6} size={56} label="Upload">
        60%
      </CircularProgress>
      <CircularProgress value={0.82} size={88} strokeWidth={6} label="Storage">
        82%
      </CircularProgress>
    </div>
  ),
};

export const IndeterminateWithText: Story = {
  args: { indeterminate: true, size: 56, label: "Syncing", children: "12" },
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "Syncing",
    });
    const text = within(bar).getByText("12");
    await expect(getComputedStyle(text).animationName).toBe("none");
    await expect(getComputedStyle(bar).animationName).toBe("none");
    await expect(
      getComputedStyle(bar.querySelector("svg")!).animationName,
    ).toBe("spin");
  },
};
