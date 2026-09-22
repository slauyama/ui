import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Dialog } from "./dialog";
import { Button } from "../button/button";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  argTypes: {
    open: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    headline: "Delete file?",
    children: "This action cannot be undone.",
    actions: (
      <>
        <Button variant="text">Cancel</Button>
        <Button variant="text">Delete</Button>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    open: true,
    icon: "warning",
    headline: "Permanently delete?",
    children: "This item will be removed for everyone.",
    actions: (
      <>
        <Button variant="text">Cancel</Button>
        <Button variant="text">Delete</Button>
      </>
    ),
  },
};

/** Escape, a click on the scrim, or the action button all call onClose. */
export const EscapeToClose: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          headline="Press Escape"
          actions={
            <Button variant="text" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          Escape, the scrim or Close all dismiss this dialog.
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const Closed: Story = {
  args: {
    open: false,
    headline: "Hidden dialog",
  },
};
