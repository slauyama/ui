import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "./descriptionList";

const meta: Meta<typeof DescriptionList> = {
  component: DescriptionList,
  args: { columns: 1, dividers: false },
  argTypes: {
    columns: { control: "inline-radio", options: [1, 2] },
  },
  render: (args) => (
    <DescriptionList
      {...args}
      style={{ width: args.columns === 2 ? 720 : 400 }}
    >
      <DescriptionList.Item term="Name">Ali Connors</DescriptionList.Item>
      <DescriptionList.Item term="Email">
        ali.connors@example.com
      </DescriptionList.Item>
      <DescriptionList.Item term="Role">Product designer</DescriptionList.Item>
      <DescriptionList.Item term="Team">Design systems</DescriptionList.Item>
      <DescriptionList.Item term="Address">
        1600 Amphitheatre Parkway, Mountain View, CA 94043
      </DescriptionList.Item>
    </DescriptionList>
  ),
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {};

export const Dividers: Story = {
  args: { dividers: true },
};

export const TwoColumns: Story = {
  args: { columns: 2 },
};

export const TwoColumnsWithDividers: Story = {
  args: { columns: 2, dividers: true },
};
