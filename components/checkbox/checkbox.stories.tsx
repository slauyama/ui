import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgState } from "../../.storybook/useArgState";
import { Checkbox, CheckboxProps } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: function Render(args) {
    const [checked, setChecked] = useArgState(args.checked);
    const [indeterminate, setIndeterminate] = useArgState(args.indeterminate);
    return (
      <Checkbox
        {...args}
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => {
          setChecked(e.target.checked);
          setIndeterminate(false);
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept terms", checked: false },
};

export const Checked: Story = {
  args: { label: "Accept terms", checked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const Disabled: Story = {
  args: { label: "Unavailable", disabled: true },
};

function GalleryCheckbox({
  initial,
  ...props
}: CheckboxProps & { initial: "unchecked" | "checked" | "indeterminate" }) {
  const [state, setState] = useState(initial);
  return (
    <Checkbox
      {...props}
      checked={state === "checked"}
      indeterminate={state === "indeterminate"}
      onChange={(e) => setState(e.target.checked ? "checked" : "unchecked")}
    />
  );
}

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <GalleryCheckbox label="Unchecked" initial="unchecked" />
      <GalleryCheckbox label="Checked" initial="checked" />
      <GalleryCheckbox label="Indeterminate" initial="indeterminate" />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled />
    </div>
  ),
};
