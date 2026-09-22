import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationDrawer, DrawerEntry } from "./navigationDrawer";
import { Heading } from "../heading/heading";

const items: DrawerEntry[] = [
  { heading: "Mail" },
  { value: "inbox", label: "Inbox", icon: "inbox", badge: 24 },
  { value: "sent", label: "Sent", icon: "send" },
  { value: "drafts", label: "Drafts", icon: "drafts" },
  { heading: "Labels" },
  { value: "starred", label: "Starred", icon: "star" },
  { value: "spam", label: "Spam", icon: "report" },
];

const meta: Meta<typeof NavigationDrawer> = {
  component: NavigationDrawer,
  argTypes: {
    modal: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationDrawer>;

export const Default: Story = {
  args: { items, value: "inbox", style: { width: 300 } },
};

export const Modal: Story = {
  args: { items, value: "inbox", modal: true, style: { width: 300 } },
};

export const WithHeader: Story = {
  args: {
    items,
    value: "inbox",
    header: (
      <Heading as="h1" variant="title-large" style={{ padding: 16 }}>
        Mailbox
      </Heading>
    ),
    style: { width: 300 },
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("inbox");
    return <NavigationDrawer items={items} value={value} onChange={setValue} style={{ width: 300 }} />;
  },
};
