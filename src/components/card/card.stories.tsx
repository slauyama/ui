import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";
import { Text } from "../text/text";
import { Heading } from "../heading/heading";
import { ALL_SURFACES } from "../../surfaces";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {ALL_SURFACES.map((surface) => (
        <Card key={surface} surface={surface}>
          <Heading>{surface} Card Title</Heading>
          <Text>Supporting text goes here.</Text>
        </Card>
      ))}
    </div>
  ),
};

export const ClickableCard: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Card onClick={() => console.log("hello")}>
        <Heading> Card Title</Heading>
        <Text>Supporting text goes here.</Text>
      </Card>
    </div>
  ),
};
