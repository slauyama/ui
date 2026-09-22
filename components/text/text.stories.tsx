import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, TextVariant } from "./text";
import { Card } from "../card/card";

const VARIANTS: TextVariant[] = [
  "body-large",
  "body-medium",
  "body-small",
  "title-medium",
  "title-small",
  "label-large",
  "label-medium",
  "label-small",
  "code",
];

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    align: { control: "select", options: [undefined, "left", "center", "right"] },
    as: { control: "select", options: ["p", "span", "div", "label"] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: "The quick brown fox jumps over the lazy dog." },
};

export const InCard: Story = {
  render: () => (
    <Card style={{ padding: 16, width: 280 }}>
      <Text>Card text inherits the surface colour.</Text>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {VARIANTS.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant}
        </Text>
      ))}
    </div>
  ),
};

export const Colored: Story = {
  args: {
    children: "Supporting text in a secondary colour",
    color: "var(--color-on-surface-variant)",
  },
};
