import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgState } from "../storyUtils/useArgState";
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
  render: function Render(args) {
    const [value, setValue] = useArgState(args.value);
    return (
      <div style={{ width: 280 }}>
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { label: "Fruit", options },
};

export const Filled: Story = {
  args: { label: "Fruit", options, variant: "filled" },
};

export const WithSupportingText: Story = {
  args: { label: "Fruit", options, supportingText: "Pick your favorite" },
};

export const Disabled: Story = {
  args: { label: "Fruit", options, disabled: true },
};
