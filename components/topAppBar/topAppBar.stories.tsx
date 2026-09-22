import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopAppBar } from "./topAppBar";
import { Icon } from "../icon/icon";

const meta: Meta<typeof TopAppBar> = {
  component: TopAppBar,
  argTypes: {
    variant: { control: "select", options: ["small", "small-centered", "medium", "large"] },
    scrolled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

const leading = <Icon name="menu" />;
const actions = (
  <div style={{ display: "flex", gap: 8 }}>
    <Icon name="search" />
    <Icon name="more_vert" />
  </div>
);

export const Small: Story = {
  args: { variant: "small", title: "Page title", leading, actions, style: { width: 480 } },
};

export const SmallCentered: Story = {
  args: { variant: "small-centered", title: "Page title", leading, actions, style: { width: 480 } },
};

export const Medium: Story = {
  args: { variant: "medium", title: "Page title", leading, actions, style: { width: 480 } },
};

export const Large: Story = {
  args: { variant: "large", title: "Page title", leading, actions, style: { width: 480 } },
};

export const Scrolled: Story = {
  args: { variant: "small", title: "Page title", leading, actions, scrolled: true, style: { width: 480 } },
};
