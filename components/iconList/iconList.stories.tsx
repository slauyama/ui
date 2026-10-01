import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconList } from "./iconList";

const meta: Meta<typeof IconList> = {
  component: IconList,
};

export default meta;
type Story = StoryObj<typeof IconList>;

export const Default: Story = {
  render: (args) => (
    <IconList {...args} style={{ width: 400 }}>
      <IconList.Item>Unlimited projects</IconList.Item>
      <IconList.Item>Priority support</IconList.Item>
      <IconList.Item>
        Shared component library with design tokens kept in sync across every
        team
      </IconList.Item>
    </IconList>
  ),
};

export const CustomIcon: Story = {
  ...Default,
  args: { icon: "star" },
};

export const PerItemIcons: Story = {
  render: () => (
    <IconList style={{ width: 400 }}>
      <IconList.Item icon="check_circle">Tests passing</IconList.Item>
      <IconList.Item icon="warning">2 lint warnings</IconList.Item>
      <IconList.Item icon="cancel">Build failed on Node 20</IconList.Item>
    </IconList>
  ),
};
