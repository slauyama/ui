import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Email address</Label>,
};

export const CustomColor: Story = {
  render: () => (
    <Label color="text-(--color-primary)">Email address</Label>
  ),
};
