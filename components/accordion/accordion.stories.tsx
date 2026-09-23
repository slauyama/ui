import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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
  },
};

export const Opened: Story = {
  args: {
    headline: "Already open",
    defaultOpen: true,
    children: "This accordion starts open via the defaultOpen prop.",
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
};
