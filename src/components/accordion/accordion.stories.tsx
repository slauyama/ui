import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./accordion";
import { Card } from "../card/card";
import { Text } from "../text/text";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Card>
      <Accordion
        triggerNode={<Text size="md">What is this component?</Text>}
        panelNode={
          <div className="px-4 pb-4">
            <Text size="sm">
              This is an accessible accordion component that animates open and
              closed.
            </Text>
          </div>
        }
      />
    </Card>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Card>
      <Accordion
        defaultOpen={true}
        triggerNode={<Text size="md">Already open</Text>}
        panelNode={
          <div className="px-4 pb-4">
            <Text size="sm">
              This accordion starts in the open state via the defaultOpen prop.
            </Text>
          </div>
        }
      />
    </Card>
  ),
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
          defaultOpen={false}
          triggerNode={
            <Text size="md" className="font-semibold text-gray-200!">
              what am i
            </Text>
          }
          panelNode={
            <div className="border-t border-gray-800 px-5 pb-5 pt-4">
              <Text size="sm" className="text-gray-400! leading-relaxed">
                a pig
              </Text>
            </div>
          }
        />
      </Card>
    </>
  ),
};
