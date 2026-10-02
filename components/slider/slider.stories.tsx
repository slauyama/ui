import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgState } from "../../.storybook/useArgState";
import { expect, userEvent, within } from "storybook/test";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  argTypes: {
    labeled: { control: "boolean" },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: { "aria-label": "Volume", style: { width: 280 } },
  render: function Render(args) {
    const [value, setValue] = useArgState(args.value);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { value: 40 },
};

export const Labeled: Story = {
  args: { value: 60, labeled: true },
};

export const Disabled: Story = {
  args: { value: 30, disabled: true },
};

/** Focus the slider, then: arrows step by 1, Page Up/Down by 10, Home/End jump to the ends. */
export const KeyboardControl: Story = {
  args: { value: 25, labeled: true, format: (v) => `${v}%` },
  play: async ({ canvasElement }) => {
    const slider = within(canvasElement).getByRole("slider");
    slider.focus();
    const steps: [string, string][] = [
      ["{ArrowRight}", "26"],
      ["{ArrowUp}", "27"],
      ["{ArrowLeft}", "26"],
      ["{ArrowDown}", "25"],
      ["{PageUp}", "35"],
      ["{PageDown}", "25"],
      ["{Home}", "0"],
      ["{ArrowLeft}", "0"],
      ["{End}", "100"],
      ["{ArrowRight}", "100"],
    ];
    for (const [key, expected] of steps) {
      await userEvent.keyboard(key);
      await expect(slider).toHaveAttribute("aria-valuenow", expected);
    }
    await expect(slider).toHaveAttribute("aria-valuetext", "100%");
  },
};

export const FormattedValue: Story = {
  args: { value: 50, labeled: true, format: (v) => `${v}%` },
};
