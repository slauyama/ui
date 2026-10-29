import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
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

const SHIPPING = [
  { value: "standard", headline: "Standard", supportingText: "5–7 days" },
  { value: "express", headline: "Express", supportingText: "2–3 days" },
  { value: "overnight", headline: "Overnight", supportingText: "Next day" },
];

function RadioListDemo() {
  const [shipping, setShipping] = useState("standard");
  return (
    <List role="radiogroup" aria-label="Shipping" style={{ width: 320 }}>
      {SHIPPING.map((s) => (
        <List.Item
          key={s.value}
          control="radio"
          name="shipping"
          value={s.value}
          headline={s.headline}
          supportingText={s.supportingText}
          lines={2}
          checked={shipping === s.value}
          onCheckedChange={() => setShipping(s.value)}
        />
      ))}
    </List>
  );
}

export const RadioList: Story = {
  render: () => <RadioListDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const standard = canvas.getByRole("radio", { name: /Standard/ });
    const express = canvas.getByRole("radio", { name: /Express/ });
    const overnight = canvas.getByRole("radio", { name: /Overnight/ });
    await expect(standard).toBeChecked();

    await userEvent.click(canvas.getByText("2–3 days"));
    await expect(express).toBeChecked();
    await expect(standard).not.toBeChecked();

    await userEvent.keyboard("{ArrowDown}");
    await expect(overnight).toHaveFocus();
    await expect(overnight).toBeChecked();
  },
};

function CheckboxListDemo() {
  const [on, setOn] = useState<Record<string, boolean>>({ email: true });
  const rows = [
    { key: "email", headline: "Email notifications" },
    { key: "push", headline: "Push notifications" },
    { key: "sms", headline: "SMS notifications", disabled: true },
  ];
  return (
    <List style={{ width: 320 }}>
      {rows.map((r) => (
        <List.Item
          key={r.key}
          control="checkbox"
          headline={r.headline}
          disabled={r.disabled}
          checked={!!on[r.key]}
          onCheckedChange={(checked) => setOn({ ...on, [r.key]: checked })}
        />
      ))}
    </List>
  );
}

export const CheckboxList: Story = {
  render: () => <CheckboxListDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByRole("checkbox", { name: "Email notifications" });
    const push = canvas.getByRole("checkbox", { name: "Push notifications" });
    const sms = canvas.getByRole("checkbox", { name: "SMS notifications" });
    await expect(email).toBeChecked();

    await userEvent.click(canvas.getByText("Push notifications"));
    await expect(push).toBeChecked();
    await expect(email).toBeChecked();

    await userEvent.click(canvas.getByText("Email notifications"));
    await expect(email).not.toBeChecked();

    await userEvent.keyboard(" ");
    await expect(email).toBeChecked();

    await expect(sms).toBeDisabled();
    await userEvent.tab();
    await expect(sms).not.toHaveFocus();
  },
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

export const ItemWithAvatar: ItemStory = {
  args: {
    headline: "Ali Connors",
    supportingText: "I'll be in your neighborhood doing errands this…",
    lines: 2,
    avatar: "https://i.pravatar.cc/40",
  },
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
