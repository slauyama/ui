import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationBar, NavItem } from "./navigationBar";

const items: NavItem[] = [
  { value: "home", label: "Home", icon: "home" },
  { value: "search", label: "Search", icon: "search" },
  { value: "favorites", label: "Favorites", icon: "favorite", badge: 3 },
  { value: "profile", label: "Profile", icon: "person" },
];

const meta: Meta<typeof NavigationBar> = {
  component: NavigationBar,
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  args: { items, value: "home" },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("home");
    return <NavigationBar items={items} value={value} onChange={setValue} />;
  },
};
