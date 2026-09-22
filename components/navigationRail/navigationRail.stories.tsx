import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationRail } from "./navigationRail";
import type { NavItem } from "../navigationBar/navigationBar";
import { Fab } from "../fab/fab";

const items: NavItem[] = [
  { value: "home", label: "Home", icon: "home" },
  { value: "search", label: "Search", icon: "search" },
  { value: "favorites", label: "Favorites", icon: "favorite" },
  { value: "profile", label: "Profile", icon: "person" },
];

const meta: Meta<typeof NavigationRail> = {
  component: NavigationRail,
  argTypes: {
    align: { control: "select", options: ["start", "center"] },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationRail>;

export const Default: Story = {
  args: { items, value: "home", style: { height: 480 } },
};

export const Centered: Story = {
  args: { items, value: "home", align: "center", style: { height: 480 } },
};

export const WithTopFab: Story = {
  args: {
    items,
    value: "home",
    top: <Fab icon="add" />,
    style: { height: 480 },
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("home");
    return <NavigationRail items={items} value={value} onChange={setValue} style={{ height: 480 }} />;
  },
};
