import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ChipGroup } from "./chipGroup";

const meta: Meta<typeof ChipGroup> = {
  component: ChipGroup,
};

export default meta;
type Story = StoryObj<typeof ChipGroup>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("all");
    return (
      <ChipGroup
        options={["All", "Design", "Engineering", "Marketing"]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithObjects: Story = {
  render: () => {
    const [value, setValue] = useState("week");
    return (
      <ChipGroup
        options={[
          { value: "day", label: "Today" },
          { value: "week", label: "This week" },
          { value: "month", label: "This month" },
          { value: "year", label: "This year" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
