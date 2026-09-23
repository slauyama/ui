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
  render: () => {
    const [value, setValue] = useState("inbox");
    return (
      <NavigationDrawer
        items={items}
        value={value}
        onChange={setValue}
        style={{ width: 300 }}
      />
    );
  },
};

export const Modal: Story = {
  render: () => {
    const [value, setValue] = useState("inbox");
    return (
      <NavigationDrawer
        items={items}
        modal={true}
        value={value}
        onChange={setValue}
        style={{ width: 300 }}
      />
    );
  },
};

export const WithHeader: Story = {
  render: () => {
    const [value, setValue] = useState("inbox");
    return (
      <NavigationDrawer
        header={
          <Heading as="h1" variant="title-large" style={{ padding: 16 }}>
            Mailbox
          </Heading>
        }
        items={items}
        value={value}
        onChange={setValue}
        style={{ width: 300 }}
      />
    );
  },
};
