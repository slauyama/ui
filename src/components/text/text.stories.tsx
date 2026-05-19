import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

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

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="bg-(--color-surface) rounded p-2 outline">
        <Text surface="surface">Surface Text</Text>
      </div>
      <div className="bg-(--color-primary) rounded p-2 outline">
        <Text surface="primary">Primary Surface Text</Text>
      </div>
      <div className="bg-(--color-primary-container) rounded p-2 outline">
        <Text surface="primary-container">Primary Container Surface Text</Text>
      </div>
    </div>
  ),
};
