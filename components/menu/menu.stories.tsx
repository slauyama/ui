import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("menu")).toBeInTheDocument();
    await expect(canvas.getAllByRole("menuitem")).toHaveLength(3);
  },
};

export const Closed: Story = {
  args: { open: false },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).queryByRole("menu"),
    ).not.toBeInTheDocument();
  },
};

function renderItem(args: MenuItemProps) {
  return (
    <Menu style={{ width: 220 }}>
      <Menu.Item {...args} />
    </Menu>
  );
}

export const Item: ItemStory = {
  args: { label: "Menu item", onClick: fn() },
  render: renderItem,
  play: async ({ args, canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("menuitem", { name: "Menu item" }),
    );
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
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
  args: { label: "Disabled", disabled: true, onClick: fn() },
  render: renderItem,
  play: async ({ args, canvasElement }) => {
    const item = within(canvasElement).getByRole("menuitem", {
      name: "Disabled",
    });
    await expect(item).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(item);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
