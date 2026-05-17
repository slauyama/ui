import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Chip } from "./chip";

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: "Label" },
};

export const Active: Story = {
  args: { children: "Label", active: true },
};

export const Disabled: Story = {
  args: { children: "Label", disabled: true },
};

export const Group: Story = {
  render: () => {
    const options = ["All", "Design", "Engineering", "Marketing"];
    const [selected, setSelected] = useState("All");
    return (
      <div className="flex gap-2">
        {options.map((opt) => (
          <Chip key={opt} active={selected === opt} onClick={() => setSelected(opt)}>
            {opt}
          </Chip>
        ))}
      </div>
    );
  },
};
