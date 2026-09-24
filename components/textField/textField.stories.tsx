import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./textField";

const meta: Meta<typeof TextField> = {
  component: TextField,
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 280 }}>
        <TextField
          label="Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 280 }}>
        <TextField
          label="Name"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    leadingIcon: "search",
    trailingIcon: "close",
    style: { width: 280 },
  },
};

export const WithSupportingText: Story = {
  args: {
    label: "Email",
    supportingText: "We'll never share it.",
    style: { width: 280 },
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    error: true,
    errorText: "Enter a valid email address",
    style: { width: 280 },
  },
};

export const WithCounter: Story = {
  args: {
    label: "Bio",
    defaultValue: "Hello",
    counterMax: 100,
    style: { width: 280 },
  },
};

export const PrefixSuffix: Story = {
  args: { label: "Price", prefix: "$", suffix: "USD", style: { width: 280 } },
};

export const Textarea: Story = {
  args: {
    label: "Description",
    textarea: true,
    rows: 4,
    style: { width: 280 },
  },
};

export const Disabled: Story = {
  args: {
    label: "Name",
    disabled: true,
    defaultValue: "Locked value",
    style: { width: 280 },
  },
};
