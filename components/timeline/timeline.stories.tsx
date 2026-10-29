import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Timeline } from "./timeline";

const meta: Meta<typeof Timeline> = {
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: (args) => (
    <Timeline {...args} style={{ width: 400 }}>
      <Timeline.Item headline="Order placed" timestamp="Oct 2, 9:41 AM">
        We've received your order and sent a confirmation email.
      </Timeline.Item>
      <Timeline.Item headline="Shipped" timestamp="Oct 3, 2:15 PM">
        Your package left our warehouse in Portland and is on its way.
      </Timeline.Item>
      <Timeline.Item
        headline="Out for delivery"
        timestamp="Oct 5, 8:02 AM"
        status="in-progress"
      >
        Arriving today between 12 and 4 PM.
      </Timeline.Item>
      <Timeline.Item headline="Delivered" status="incomplete" />
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("listitem");
    await expect(items).toHaveLength(4);
    await expect(items[2]).toHaveAttribute("aria-current", "step");
    await expect(items[0]).not.toHaveAttribute("aria-current");
  },
};

export const AllIncomplete: Story = {
  render: () => (
    <Timeline style={{ width: 400 }}>
      <Timeline.Item headline="Kickoff" timestamp="Nov 4" status="incomplete" />
      <Timeline.Item
        headline="Design review"
        timestamp="Nov 18"
        status="incomplete"
      />
      <Timeline.Item headline="Launch" timestamp="Dec 2" status="incomplete" />
    </Timeline>
  ),
};

export const TextOnly: Story = {
  render: () => (
    <Timeline style={{ width: 400 }}>
      <Timeline.Item>Draft created</Timeline.Item>
      <Timeline.Item>Sent for review</Timeline.Item>
      <Timeline.Item>
        Approved with two comments, both about the wording of the summary
        paragraph, which now wraps onto a second line.
      </Timeline.Item>
    </Timeline>
  ),
};
