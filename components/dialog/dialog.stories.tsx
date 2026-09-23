import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Dialog } from "./dialog";
import { Button } from "../button/button";
import { useIsOpen } from "../../hooks/useIsOpen";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  argTypes: {
    open: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const { isOpen, open, close } = useIsOpen();
    return (
      <>
        <Button onClick={open}>Toggle Dialog</Button>
        <Dialog
          actions={
            <>
              <Button variant="text" onClick={close}>
                Cancel
              </Button>
              <Button variant="text">Delete</Button>
            </>
          }
          headline="Delete file?"
          open={isOpen}
          onClose={close}
        >
          This action cannot be undone.
        </Dialog>
      </>
    );
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
