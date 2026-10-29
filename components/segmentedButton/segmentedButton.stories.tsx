import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { SegmentedButton } from "./segmentedButton";
import type { SegmentedOption } from "./segmentedButton";

const options: SegmentedOption[] = [
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const day = canvas.getByRole("button", { name: "Day" });
    const week = canvas.getByRole("button", { name: "Week" });
    await expect(week).toHaveAttribute("aria-pressed", "true");
    await expect(day).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(day);
    await expect(day).toHaveAttribute("aria-pressed", "true");
    await expect(week).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(day);
    await expect(day).toHaveAttribute("aria-pressed", "true");
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const day = canvas.getByRole("button", { name: "Day" });
    const month = canvas.getByRole("button", { name: "Month" });
    await userEvent.click(month);
    await expect(day).toHaveAttribute("aria-pressed", "true");
    await expect(month).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(day);
    await expect(day).toHaveAttribute("aria-pressed", "false");
    await expect(month).toHaveAttribute("aria-pressed", "true");
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
