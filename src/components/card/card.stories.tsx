import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";
import { Text } from "../text/text";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="p-6 max-w-sm">
      <Text as="p">This is a card with some content inside it.</Text>
    </Card>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Card className="p-6 max-w-sm">
      <h3 className="text-base font-semibold text-zinc-800 mb-1">Card title</h3>
      <p className="text-sm text-zinc-500">Supporting text goes here.</p>
    </Card>
  ),
};
