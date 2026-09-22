import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChipSet } from "./chipSet";
import { Chip } from "../chip/chip";

const meta: Meta<typeof ChipSet> = {
  component: ChipSet,
};

export default meta;
type Story = StoryObj<typeof ChipSet>;

export const Default: Story = {
  render: () => (
    <ChipSet>
      <Chip variant="filter" label="Nearby" icon="near_me" />
      <Chip variant="filter" label="Open now" icon="schedule" />
      <Chip variant="filter" label="Top rated" icon="star" />
    </ChipSet>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <ChipSet>
        {["Coffee", "Tea", "Juice", "Smoothies", "Bakery", "Sandwiches", "Salads"].map((label) => (
          <Chip key={label} variant="suggestion" label={label} />
        ))}
      </ChipSet>
    </div>
  ),
};
