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

export const Default: Story = {
  args: { label: "Fruit", options, onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox", { name: "Fruit" });
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("listbox")).not.toBeInTheDocument();

    await userEvent.click(combobox);
    await waitFor(() => expect(canvas.getByRole("listbox")).toBeVisible());
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    await expect(combobox).toHaveAttribute(
      "aria-controls",
      canvas.getByRole("listbox").id,
    );
    await expect(canvas.getAllByRole("option")).toHaveLength(3);

    await userEvent.click(canvas.getByRole("option", { name: "Banana" }));
    await expect(args.onChange).toHaveBeenCalledWith("banana");
    await waitFor(() =>
      expect(canvas.queryByRole("listbox")).not.toBeInTheDocument(),
    );
    await expect(combobox).toHaveTextContent("Banana");
    await expect(combobox).toHaveFocus();

    await userEvent.click(combobox);
    await expect(
      canvas.getByRole("option", { name: "Banana" }),
    ).toHaveAttribute("aria-selected", "true");
    await userEvent.click(canvas.getByRole("option", { name: "Cherry" }));
    await expect(args.onChange).toHaveBeenLastCalledWith("cherry");
    await expect(combobox).toHaveTextContent("Cherry");
  },
};

export const Keyboard: Story = {
  args: { label: "Fruit", options, value: "banana", onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox", { name: "Fruit" });
    await userEvent.tab();
    await expect(combobox).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => expect(canvas.getByRole("listbox")).toBeVisible());
    const banana = canvas.getByRole("option", { name: "Banana" });
    await expect(combobox).toHaveAttribute("aria-activedescendant", banana.id);

    await userEvent.keyboard("{ArrowDown}");
    const cherry = canvas.getByRole("option", { name: "Cherry" });
    await expect(combobox).toHaveAttribute("aria-activedescendant", cherry.id);
    await userEvent.keyboard("{ArrowDown}");
    await expect(combobox).toHaveAttribute("aria-activedescendant", cherry.id);
    await userEvent.keyboard("{Home}");
    await expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      canvas.getByRole("option", { name: "Apple" }).id,
    );

    await userEvent.keyboard("{Enter}");
    await expect(args.onChange).toHaveBeenLastCalledWith("apple");
    await waitFor(() =>
      expect(canvas.queryByRole("listbox")).not.toBeInTheDocument(),
    );
    await expect(combobox).toHaveFocus();

    await userEvent.keyboard(" ");
    await waitFor(() => expect(canvas.getByRole("listbox")).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(canvas.queryByRole("listbox")).not.toBeInTheDocument(),
    );
    await expect(args.onChange).toHaveBeenCalledTimes(1);
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
    const combobox = canvas.getByRole("combobox", { name: "Fruit" });
    await expect(combobox).toHaveAttribute("aria-disabled", "true");
    await expect(combobox).not.toHaveAttribute("tabindex");
    await userEvent.setup({ pointerEventsCheck: 0 }).click(combobox);
    await expect(canvas.queryByRole("listbox")).not.toBeInTheDocument();
  },
};
