import type { Meta, StoryObj } from "@storybook/react-vite";
import { NumberedList } from "./numberedList";

const meta: Meta<typeof NumberedList> = {
  component: NumberedList,
  render: (args) => (
    <NumberedList {...args} style={{ width: 400 }}>
      <NumberedList.Item>
        Install the package from GitHub Packages.
      </NumberedList.Item>
      <NumberedList.Item>
        Import styles.css once at your app root.
      </NumberedList.Item>
      <NumberedList.Item>
        Render a component and check it picks up the colour and type tokens from
        the stylesheet.
      </NumberedList.Item>
    </NumberedList>
  ),
};

export default meta;
type Story = StoryObj<typeof NumberedList>;

export const Default: Story = {};

export const StartAt: Story = {
  args: { start: 4 },
};

export const DoubleDigits: Story = {
  render: () => (
    <NumberedList start={8} style={{ width: 400 }}>
      <NumberedList.Item>Eighth step</NumberedList.Item>
      <NumberedList.Item>Ninth step</NumberedList.Item>
      <NumberedList.Item>Tenth step</NumberedList.Item>
      <NumberedList.Item>Eleventh step</NumberedList.Item>
    </NumberedList>
  ),
};
