import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./accordion";
import { Card } from "../card/card";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    triggerNode: "What is this component?",
    panelNode: (
      <div className="px-4 pb-4">
        <p className="text-sm text-zinc-600">
          This is an accessible accordion component that animates open and
          closed.
        </p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    triggerNode: "Already open",
    panelNode: (
      <div className="px-4 pb-4">
        <p className="text-sm text-zinc-600">
          This accordion starts in the open state via the defaultOpen prop.
        </p>
      </div>
    ),
    defaultOpen: true,
  },
};

export const Multiple: Story = {
  render: () => (
    <>
      <Card>
        <Accordion
          triggerNode="Section one"
          panelNode={
            <div className="px-4 pb-4">
              <p className="text-sm text-zinc-600">Content for section one.</p>
            </div>
          }
        />
      </Card>
      <Card>
        <Accordion
          triggerNode="Section two"
          panelNode={
            <div className="px-4 pb-4">
              <p className="text-sm text-zinc-600">Content for section two.</p>
            </div>
          }
        />
      </Card>
      <Card>
        <Accordion
          triggerNode="Section three"
          defaultOpen
          panelNode={
            <div className="px-4 pb-4">
              <p className="text-sm text-zinc-600">
                Content for section three — starts open.
              </p>
            </div>
          }
        />
      </Card>
    </>
  ),
};
