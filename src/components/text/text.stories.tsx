import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    variant: { control: "select", options: ["body", "label", "caption", "muted"] },
    as: { control: "select", options: ["p", "span", "div", "label"] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: { variant: "body", children: "Body text — used for general content." },
};

export const Label: Story = {
  args: { variant: "label", children: "Label text — used for form labels." },
};

export const Caption: Story = {
  args: { variant: "caption", children: "Caption text — used for secondary info." },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Muted text — used for hints and metadata." },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="body">Body text</Text>
      <Text variant="label">Label text</Text>
      <Text variant="caption">Caption text</Text>
      <Text variant="muted">Muted text</Text>
    </div>
  ),
};
