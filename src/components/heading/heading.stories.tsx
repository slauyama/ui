import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  component: Heading,
  argTypes: {
    variant: { control: "select", options: ["display", "title", "subtitle"] },
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading variant="display">Display heading</Heading>
      <Heading variant="title">Title heading</Heading>
      <Heading variant="subtitle">Subtitle heading</Heading>
    </div>
  ),
};

export const AllSurfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="bg-(--color-surface) rounded p-2 outline">
        <Heading surface="surface">Surface heading</Heading>
      </div>
      <div className="bg-(--color-primary) rounded p-2 outline">
        <Heading surface="primary">Primary heading</Heading>
      </div>
      <div className="bg-(--color-primary-container) rounded p-2 outline">
        <Heading surface="primary-container">Primary-Container heading</Heading>
      </div>
    </div>
  ),
};
