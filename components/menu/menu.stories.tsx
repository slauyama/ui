import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu } from "./menu";
import type { MenuItemProps } from "./menuItem";

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;
type ItemStory = StoryObj<MenuItemProps>;

export const Default: Story = {
  render: () => (
    <Menu style={{ width: 220 }}>
      <Menu.Item label="Cut" leading="content_cut" trailing="⌘X" />
      <Menu.Item label="Copy" leading="content_copy" trailing="⌘C" />
      <Menu.Item label="Paste" leading="content_paste" trailing="⌘V" />
    </Menu>
  ),
};

export const Closed: Story = {
  args: { open: false },
};

function renderItem(args: MenuItemProps) {
  return (
    <Menu style={{ width: 220 }}>
      <Menu.Item {...args} />
    </Menu>
  );
}

export const Item: ItemStory = {
  args: { label: "Menu item" },
  render: renderItem,
};

export const ItemWithLeadingIcon: ItemStory = {
  args: { label: "Settings", leading: "settings" },
  render: renderItem,
};

export const ItemWithTrailing: ItemStory = {
  args: { label: "Copy", leading: "content_copy", trailing: "⌘C" },
  render: renderItem,
};

export const ItemSelected: ItemStory = {
  args: { label: "Selected", selected: true },
  render: renderItem,
};

export const ItemDisabled: ItemStory = {
  args: { label: "Disabled", disabled: true },
  render: renderItem,
};
