import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar } from "./snackbar";

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: { message: "Item archived" },
};

export const WithAction: Story = {
  args: {
    message: "Item archived",
    action: "Undo",
    onAction: () => alert("Undo"),
  },
};

export const WithDismiss: Story = {
  args: {
    message: "Connection lost",
    action: "Retry",
    onAction: () => alert("Retry"),
    onClose: () => alert("Dismissed"),
  },
};
