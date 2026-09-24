import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./list";
import type { ListItemProps } from "./listItem";

const meta: Meta<typeof List> = {
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;
type ItemStory = StoryObj<ListItemProps>;

export const Default: Story = {
  render: () => (
    <List style={{ width: 280 }}>
      <List.Item headline="Inbox" leadingIcon="inbox" />
      <List.Item headline="Starred" leadingIcon="star" />
      <List.Item headline="Sent" leadingIcon="send" />
    </List>
  ),
};

export const Dividers: Story = {
  render: () => (
    <List dividers style={{ width: 280 }}>
      <List.Item headline="Inbox" leadingIcon="inbox" />
      <List.Item headline="Starred" leadingIcon="star" />
      <List.Item headline="Sent" leadingIcon="send" />
    </List>
  ),
};

function renderItem(args: ListItemProps) {
  return (
    <List style={{ width: 320 }}>
      <List.Item {...args} />
    </List>
  );
}

export const Item: ItemStory = {
  args: { headline: "Headline" },
  argTypes: { lines: { control: "select", options: [1, 2, 3] } },
  render: renderItem,
};

export const ItemWithSupportingText: ItemStory = {
  args: {
    headline: "Headline",
    supportingText: "Supporting line of text that describes the item",
    lines: 2,
    leadingIcon: "person",
  },
  render: renderItem,
};

export const ItemWithTrailing: ItemStory = {
  args: {
    headline: "Headline",
    supportingText: "Supporting text",
    trailingText: "3:41 PM",
    leadingIcon: "mail",
    trailingIcon: "chevron_right",
  },
  render: renderItem,
};

export const ItemInteractive: ItemStory = {
  args: {
    headline: "Clickable row",
    leadingIcon: "touch_app",
    onClick: () => alert("Row clicked"),
  },
  render: renderItem,
};

export const ItemAsLink: ItemStory = {
  args: {
    headline: "Go to settings",
    leadingIcon: "settings",
    href: "#",
  },
  render: renderItem,
};

export const ItemSelected: ItemStory = {
  args: {
    headline: "Selected row",
    selected: true,
    leadingIcon: "check_circle",
  },
  render: renderItem,
};

export const ItemDisabled: ItemStory = {
  args: {
    headline: "Disabled row",
    disabled: true,
    onClick: () => alert("should not fire"),
    leadingIcon: "block",
  },
  render: renderItem,
};
