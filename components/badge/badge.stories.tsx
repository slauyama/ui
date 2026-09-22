import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { Icon } from "../icon/icon";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { value: 3 },
};

export const Dot: Story = {
  args: { dot: true },
};

export const AnchoredToContent: Story = {
  render: () => {
    const color =
      document.documentElement.style.colorScheme === "dark" ? "white" : "black";
    return (
      <div style={{ display: "flex", gap: 32, padding: 16 }}>
        <Badge value={4}>
          <Icon name="info" color={color} />
        </Badge>
        <Badge dot>
          <Icon name="mail" color={color} />
        </Badge>
      </div>
    );
  },
};
