import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";
import { Text } from "../text/text";

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    variant: { control: "select", options: ["elevated", "filled", "outlined"] },
    interactive: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <Text>Card content</Text>,
    style: { padding: 16, width: 240 },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["elevated", "filled", "outlined"] as const).map((variant) => (
        <Card
          key={variant}
          variant={variant}
          style={{ padding: 16, width: 160 }}
        >
          <Text>{variant}</Text>
        </Card>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: <Text>Click me</Text>,
    style: { padding: 16, width: 240 },
    onClick: () => alert("Card clicked"),
  },
};
