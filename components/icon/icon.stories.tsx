import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./icon";
import { Text } from "../text/text";

const meta: Meta<typeof Icon> = {
  component: Icon,
  argTypes: {
    filled: { control: "boolean" },
    weight: { control: "number" },
    size: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: "rocket_launch" },
};

export const Filled: Story = {
  args: { name: "favorite", filled: true },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {[
        "home",
        "search",
        "settings",
        "favorite",
        "delete",
        "check",
        "close",
        "menu",
        "rocket_launch",
      ].map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Icon name={name} size={32} />
          <Text as="span" variant="label-small">
            {name}
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
      {[18, 24, 36, 48].map((size) => (
        <Icon key={size} name="rocket_launch" size={size} />
      ))}
    </div>
  ),
};

export const FillAndWeight: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Icon name="favorite" size={32} filled={false} weight={300} />
      <Icon name="favorite" size={32} filled={false} weight={700} />
      <Icon name="favorite" size={32} filled={true} weight={400} />
    </div>
  ),
};
