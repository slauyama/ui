import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Snackbar } from "./snackbar";

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: { message: "Item archived" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent("Item archived");
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
  },
};

export const WithAction: Story = {
  args: {
    message: "Item archived",
    action: "Undo",
    onAction: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Undo" }));
    await expect(args.onAction).toHaveBeenCalledTimes(1);
    await expect(
      canvas.queryByRole("button", { name: "Dismiss" }),
    ).not.toBeInTheDocument();
  },
};

export const WithDismiss: Story = {
  args: {
    message: "Connection lost",
    action: "Retry",
    onAction: fn(),
    onClose: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(args.onClose).toHaveBeenCalledTimes(1);
    await expect(args.onAction).not.toHaveBeenCalled();
  },
};
