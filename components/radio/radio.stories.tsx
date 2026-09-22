import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./radio";

const meta: Meta<typeof Radio> = {
  component: Radio,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { label: "Option A", name: "story-radio" },
};

export const Checked: Story = {
  args: { label: "Option A", name: "story-radio", checked: true },
};

export const Disabled: Story = {
  args: { label: "Unavailable", name: "story-radio", disabled: true },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {["a", "b", "c"].map((v) => (
          <Radio
            key={v}
            name="story-radio-group"
            value={v}
            label={`Option ${v.toUpperCase()}`}
            checked={value === v}
            onChange={() => setValue(v)}
          />
        ))}
      </div>
    );
  },
};
