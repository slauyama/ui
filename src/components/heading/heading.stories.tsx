import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";
import { Card } from "../card/card";
import { ALL_SURFACES } from "../../surfaces";

const meta: Meta<typeof Heading> = {
  component: Heading,
  argTypes: {
    variant: { control: "select", options: ["display", "title", "subtitle"] },
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {ALL_SURFACES.map((surface) => (
        <Card key={surface} surface={surface}>
          <Heading>{surface} Heading</Heading>
        </Card>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading variant="display">Display heading</Heading>
      <Heading variant="title">Title heading</Heading>
      <Heading variant="subtitle">Subtitle heading</Heading>
    </div>
  ),
};
