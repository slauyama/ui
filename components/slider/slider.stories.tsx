import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Slider } from "./slider";
import { Text } from "../text/text";

const meta: Meta<typeof Slider> = {
  component: Slider,
  argTypes: {
    labeled: { control: "boolean" },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { "aria-label": "Volume", value: 40, style: { width: 280 } },
};

export const Labeled: Story = {
  args: { "aria-label": "Volume", value: 60, labeled: true, style: { width: 280 } },
};

export const Disabled: Story = {
  args: { "aria-label": "Volume", value: 30, disabled: true, style: { width: 280 } },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    return (
      <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 8 }}>
        <Slider aria-label="Volume" value={value} onChange={setValue} labeled />
        <Text as="span" variant="body-small">
          Value: {value}
        </Text>
      </div>
    );
  },
};

/** Focus the slider, then: arrows step by 1, Page Up/Down by 10, Home/End jump to the ends. */
export const KeyboardControl: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    return (
      <div style={{ width: 280 }}>
        <Slider
          aria-label="Volume"
          value={value}
          onChange={setValue}
          labeled
          format={(v) => `${v}%`}
        />
      </div>
    );
  },
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
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 280 }}>
        <Slider aria-label="Volume" value={value} onChange={setValue} labeled format={(v) => `${v}%`} />
      </div>
    );
  },
};
