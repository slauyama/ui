import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, HeadingVariant } from "./heading";
import { Card } from "../card/card";

const VARIANTS: HeadingVariant[] = [
  "display-hero",
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-large",
  "title-medium",
  "title-small",
];

const meta: Meta<typeof Heading> = {
  component: Heading,
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {VARIANTS.map((variant) => (
        <Heading key={variant} variant={variant}>
          {variant}
        </Heading>
      ))}
    </div>
  ),
};

export const Default: Story = {
  args: { children: "Heading" },
};

export const InCard: Story = {
  render: () => (
    <Card style={{ padding: 16, width: 280 }}>
      <Heading variant="headline-small">Card heading</Heading>
    </Card>
  ),
};
