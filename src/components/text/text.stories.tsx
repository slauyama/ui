import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";
import { Card } from "../card/card";
import { ALL_SURFACES } from "../../surfaces";

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    surface: {
      control: "select",
      options: ["surface", "primary", "primary-container"],
    },
    as: { control: "select", options: ["p", "span", "div", "label"] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {ALL_SURFACES.map((surface) => (
        <Card key={surface} surface={surface}>
          <Text>{surface} Text</Text>
        </Card>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text size="xs">XS Text</Text>
      <Text size="sm">SM Text</Text>
      <Text size="md">MD Text</Text>
      <Text size="lg">LG Text</Text>
    </div>
  ),
};
