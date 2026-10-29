import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Name" });
    await userEvent.click(input);
    await expect(input).toHaveFocus();
    await userEvent.type(input, "Ada Lovelace");
    await expect(input).toHaveValue("Ada Lovelace");
    await userEvent.clear(input);
    await expect(input).toHaveValue("");
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

export const ClearButton: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 280 }}>
        <TextField
          label="Search"
          leadingIcon="search"
          trailingIcon="close"
          trailingIconLabel="Clear"
          onTrailingClick={() => setValue("")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Search" });
    await userEvent.type(input, "lamps");
    await userEvent.tab();
    const clear = canvas.getByRole("button", { name: "Clear" });
    await expect(clear).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(input).toHaveValue("");
  },
};

export const WithSupportingText: Story = {
  args: {
    label: "Email",
    supportingText: "We'll never share it.",
    style: { width: 280 },
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAccessibleDescription("We'll never share it.");
    await expect(input).not.toHaveAttribute("aria-invalid");
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    error: true,
    errorText: "Enter a valid email address",
    supportingText: "We'll never share it.",
    style: { width: 280 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Enter a valid email address"),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByText("We'll never share it."),
    ).not.toBeInTheDocument();
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      "Enter a valid email address",
    );
  },
};

export const WithCounter: Story = {
  args: {
    label: "Bio",
    defaultValue: "Hello",
    counterMax: 100,
    style: { width: 280 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("5/100")).toBeInTheDocument();
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Bio" }),
      " there",
    );
    await expect(canvas.getByText("11/100")).toBeInTheDocument();
  },
};

export const PrefixSuffix: Story = {
  args: { label: "Price", prefix: "$", suffix: "USD", style: { width: 280 } },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("textbox"),
    ).toHaveAccessibleName("Price");
  },
};

export const Textarea: Story = {
  args: {
    label: "Description",
    textarea: true,
    rows: 4,
    style: { width: 280 },
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", {
      name: "Description",
    });
    await expect(input.tagName).toBe("TEXTAREA");
    await userEvent.type(input, "Line one{Enter}Line two");
    await expect(input).toHaveValue("Line one\nLine two");
  },
};

export const Disabled: Story = {
  args: {
    label: "Name",
    disabled: true,
    defaultValue: "Locked value",
    style: { width: 280 },
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Name" });
    await expect(input).toBeDisabled();
    await userEvent.type(input, "more");
    await expect(input).toHaveValue("Locked value");
  },
};
