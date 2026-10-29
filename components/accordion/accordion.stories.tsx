import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Accordion } from "./accordion";
import { Button } from "../button/button";
import { Card } from "../card/card";
import { Divider } from "../divider/divider";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  argTypes: {
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <Card variant="outlined" style={{ width: 360 }}>
        <Story />
      </Card>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    headline: "What is this component?",
    children:
      "An accessible accordion that animates open and closed. The headline row is a button; the panel is its children.",
    onOpenChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: "What is this component?",
    });
    const panel = canvas.getByRole("region");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveAttribute("aria-controls", panel.id);
    await expect(panel).toHaveAttribute("aria-labelledby", trigger.id);

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
  },
};

export const ClosedPanelIsInert: Story = {
  render: () => (
    <Accordion headline="Shipping details">
      See our <a href="#returns">returns policy</a>.
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("returns policy");
    link.focus();
    await expect(link).not.toHaveFocus();

    await userEvent.click(
      canvas.getByRole("button", { name: "Shipping details" }),
    );
    link.focus();
    await expect(link).toHaveFocus();
  },
};

export const KeyboardToggle: Story = {
  args: {
    headline: "Toggle with the keyboard",
    children: "Enter and Space both open and close this section.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: "Toggle with the keyboard",
    });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard(" ");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const Opened: Story = {
  args: {
    headline: "Already open",
    defaultOpen: true,
    children: "This accordion starts open via the defaultOpen prop.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Already open" }),
    ).toHaveAttribute("aria-expanded", "true");
  },
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Accordion
        headline="Controlled accordion"
        open={open}
        onOpenChange={setOpen}
      >
        Its open state lives in the parent, which is currently{" "}
        {open ? "open" : "closed"}.
      </Accordion>
      <Button
        variant="tonal"
        onClick={() => setOpen((o) => !o)}
        style={{ margin: 16 }}
      >
        Toggle from outside
      </Button>
    </>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: "Controlled accordion",
    });
    await userEvent.click(
      canvas.getByRole("button", { name: "Toggle from outside" }),
    );
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(/currently open/)).toBeInTheDocument();

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByText(/currently closed/)).toBeInTheDocument();
  },
};

export const Multiple: Story = {
  render: () => (
    <>
      <Accordion headline="Section one">Content for section one.</Accordion>
      <Divider />
      <Accordion headline="Section two">Content for section two.</Accordion>
      <Divider />
      <Accordion headline="Section three">Content for section three.</Accordion>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Section two" }));
    await expect(
      canvas.getByRole("button", { name: "Section one" }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(
      canvas.getByRole("button", { name: "Section two" }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("button", { name: "Section three" }),
    ).toHaveAttribute("aria-expanded", "false");
  },
};
