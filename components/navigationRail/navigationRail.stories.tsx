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
  render: () => {
    const [value, setValue] = useState("home");
    return (
      <NavigationRail
        items={items}
        value={value}
        onChange={setValue}
        style={{ height: 480 }}
      />
    );
  },
};

export const Centered: Story = {
  render: () => {
    const [value, setValue] = useState("home");
    return (
      <NavigationRail
        align="center"
        items={items}
        value={value}
        onChange={setValue}
        style={{ height: 480 }}
      />
    );
  },
  args: { items, value: "home", align: "center", style: { height: 480 } },
};

export const WithTopFab: Story = {
  render: () => {
    const [value, setValue] = useState("home");
    return (
      <NavigationRail
        items={items}
        value={value}
        top={<Fab icon="add" />}
        onChange={setValue}
        style={{ height: 480 }}
      />
    );
  },
};
