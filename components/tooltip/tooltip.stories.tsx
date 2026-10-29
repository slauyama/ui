import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Tooltip } from "./tooltip";
import { Button } from "../button/button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: { label: "Tooltip label" },
  render: (args) => (
    <div style={{ padding: 48 }}>
      <Tooltip {...args}>
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Hover me" });
    await expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument();

    await userEvent.hover(trigger);
    const tooltip = canvas.getByRole("tooltip");
    await expect(tooltip).toHaveTextContent("Tooltip label");
    await expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    await expect(trigger).toHaveAccessibleDescription("Tooltip label");

    await userEvent.unhover(trigger);
    await waitFor(() =>
      expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  },
};

export const KeyboardAndEscape: Story = {
  args: { label: "Shown on focus" },
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Hover me" }),
    ).toHaveFocus();
    await expect(canvas.getByRole("tooltip")).toHaveTextContent(
      "Shown on focus",
    );

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 48 }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} label={placement} placement={placement}>
          <Button variant="outlined">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const InOverflowHidden: Story = {
  render: () => (
    <div style={{ padding: 48 }}>
      <div
        style={{
          overflow: "hidden",
          width: 140,
          padding: 8,
          border: "1px dashed var(--color-outline)",
        }}
      >
        <Tooltip label="Not clipped by the box around me">
          <Button variant="outlined">Hover me</Button>
        </Tooltip>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: "Hover me" }));
    const tooltip = canvas.getByRole("tooltip");
    await expect(tooltip.matches(":popover-open")).toBe(true);
  },
};
