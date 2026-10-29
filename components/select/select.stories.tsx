import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { useArgState } from "../../.storybook/useArgState";
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
        <Select
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v);
            args.onChange?.(v);
          }}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// The field has no role to query by, so reach for its clickable box directly.
function fieldBox(canvasElement: HTMLElement) {
  return canvasElement.querySelector<HTMLElement>(".cursor-pointer")!;
}

export const Default: Story = {
  args: { label: "Fruit", options, onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();

    await userEvent.click(fieldBox(canvasElement));
    await waitFor(() => expect(canvas.getByRole("menu")).toBeVisible());
    await expect(canvas.getAllByRole("menuitem")).toHaveLength(3);

    await userEvent.click(canvas.getByRole("menuitem", { name: "Banana" }));
    await expect(args.onChange).toHaveBeenCalledWith("banana");
    await waitFor(() =>
      expect(canvas.queryByRole("menu")).not.toBeInTheDocument(),
    );
    await expect(fieldBox(canvasElement)).toHaveTextContent("Banana");

    await userEvent.click(fieldBox(canvasElement));
    await userEvent.click(canvas.getByRole("menuitem", { name: "Cherry" }));
    await expect(args.onChange).toHaveBeenLastCalledWith("cherry");
    await expect(fieldBox(canvasElement)).toHaveTextContent("Cherry");
  },
};

export const Filled: Story = {
  args: { label: "Fruit", options, variant: "filled" },
};

export const WithSupportingText: Story = {
  args: { label: "Fruit", options, supportingText: "Pick your favorite" },
};

export const Disabled: Story = {
  args: { label: "Fruit", options, disabled: true, onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const box = fieldBox(canvasElement);
    await expect(box).toHaveStyle({ pointerEvents: "none" });
    await userEvent.setup({ pointerEventsCheck: 0 }).click(box);
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
  },
};
