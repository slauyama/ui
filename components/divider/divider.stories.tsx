import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./divider";
import { Text } from "../text/text";

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
      <Text as="div">Item one</Text>
      <Divider />
      <Text as="div">Item two</Text>
    </div>
  ),
};

export const Inset: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Text as="div">Item one</Text>
      <Divider inset />
      <Text as="div">Item two</Text>
    </div>
  ),
};

export const InsetStart: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Text as="div">Item one</Text>
      <Divider insetStart />
      <Text as="div">Item two</Text>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", height: 48, gap: 8 }}>
      <Text as="span">Left</Text>
      <Divider vertical />
      <Text as="span">Right</Text>
    </div>
  ),
};
