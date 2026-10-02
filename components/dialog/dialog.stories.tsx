import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useArgState } from "../../.storybook/useArgState";
import { Dialog } from "./dialog";
import { Button } from "../button/button";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  argTypes: {
    open: { control: "boolean" },
    variant: {
      control: "inline-radio",
      options: ["default", "full-screen", "responsive"],
    },
  },
  args: { open: true },
  render: function Render(args) {
    const [open, setOpen] = useArgState(args.open);
    function close() {
      setOpen(false);
    }
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          {...args}
          open={open}
          onClose={close}
          actions={
            args.actions ? (
              <div style={{ display: "contents" }} onClick={close}>
                {args.actions}
              </div>
            ) : undefined
          }
        />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
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
  args: {
    headline: "Press Escape",
    children: "Escape, the scrim or Close all dismiss this dialog.",
    actions: <Button variant="text">Close</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const FullScreen: Story = {
  args: {
    variant: "full-screen",
    headline: "New event",
    children:
      "Full-screen dialogs fill the viewport and carry their actions in the header. Use them on compact screens for tasks with several inputs.",
    actions: <Button variant="text">Save</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const Responsive: Story = {
  args: {
    variant: "responsive",
    headline: "New event",
    children: "At 640px wide or less, this dialog goes full-screen.",
    actions: <Button variant="text">Save</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const compact = window.matchMedia("(max-width: 640px)").matches;
    await expect(canvas.getByRole("dialog")).toHaveAttribute(
      "data-layout",
      compact ? "full-screen" : "default",
    );
  },
};
