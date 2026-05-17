import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {
    variant: { control: "select", options: ["default", "pill"] },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS = ["Apple", "Banana", "Cherry", "Mango"];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={OPTIONS}
        placeholder="Select a fruit"
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        label="Fruit"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={OPTIONS}
        placeholder="Select a fruit"
      />
    );
  },
};

export const Pill: Story = {
  render: () => {
    const [value, setValue] = useState("Apple");
    return (
      <Select
        variant="pill"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={OPTIONS}
      />
    );
  },
};
