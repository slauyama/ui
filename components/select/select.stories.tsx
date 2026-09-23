import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";
import type { SelectOption } from "./select";

const options: SelectOption[] = [
  { value: "apple", label: "Apple", icon: "nutrition" },
  { value: "banana", label: "Banana", icon: "nutrition" },
  { value: "cherry", label: "Cherry", icon: "nutrition" },
];

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { label: "Fruit", options, style: { width: 280 } },
};

export const Filled: Story = {
  args: { label: "Fruit", variant: "filled", options, style: { width: 280 } },
};

export const WithSupportingText: Story = {
  args: { label: "Fruit", options, supportingText: "Pick your favorite", style: { width: 280 } },
};

export const Disabled: Story = {
  args: { label: "Fruit", options, disabled: true, style: { width: 280 } },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 280 }}>
        <Select label="Fruit" options={options} value={value} onChange={setValue} supportingText={value ? `Selected: ${value}` : undefined} />
      </div>
    );
  },
};
