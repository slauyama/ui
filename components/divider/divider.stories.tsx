import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./divider";
import { Heading } from "../heading/heading";

const meta: Meta<typeof Divider> = {
  component: Divider,
  argTypes: {
    inset: { control: "boolean" },
    insetStart: { control: "boolean" },
    vertical: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Heading as="h2">Item one</Heading>
      <Divider />
      <Heading as="h2">Item two</Heading>
    </div>
  ),
};

export const Inset: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Heading as="h2">Item one</Heading>
      <Divider inset />
      <Heading as="h2">Item two</Heading>
    </div>
  ),
};

export const InsetStart: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Heading as="h2">Item one</Heading>
      <Divider insetStart />
      <Heading as="h2">Item two</Heading>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", height: 48, gap: 8 }}>
      <Heading as="h2">Left</Heading>
      <Divider vertical />
      <Heading as="h2">Right</Heading>
    </div>
  ),
};
