import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SegmentedButton } from "./segmentedButton";

const options = [
  { value: "day", label: "Day", icon: "calendar_view_day" },
  { value: "week", label: "Week", icon: "calendar_view_week" },
  { value: "month", label: "Month", icon: "calendar_view_month" },
];

const meta: Meta<typeof SegmentedButton> = {
  component: SegmentedButton,
  argTypes: {
    multiselect: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedButton>;

export const Default: Story = {
  render: function DefaultStory() {
    const [value, setValue] = useState("week");
    return (
      <SegmentedButton
        options={options}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const Multiselect: Story = {
  render: function MultiselectStory() {
    const [value, setValue] = useState<string[]>(["day"]);
    return (
      <SegmentedButton
        options={options}
        value={value}
        onChange={(v) => setValue(v as string[])}
        multiselect
      />
    );
  },
};

export const NoIcons: Story = {
  render: function NoIconsStory() {
    const [value, setValue] = useState("week");
    return (
      <SegmentedButton
        options={options.map(({ value, label }) => ({ value, label }))}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};
