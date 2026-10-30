import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "./menu";

describe("Menu", () => {
  it("is a menu of menuitems", () => {
    render(
      <Menu aria-label="Edit">
        <Menu.Item label="Copy" leading="content_copy" trailing="⌘C" />
        <Menu.Item label="Paste" />
      </Menu>,
    );
    const menu = screen.getByRole("menu", { name: "Edit" });
    expect(menu).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    expect(screen.getByRole("menuitem", { name: "Copy ⌘C" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("renders nothing when closed", () => {
    render(
      <Menu open={false}>
        <Menu.Item label="Copy" />
      </Menu>,
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls an item's onClick", async () => {
    const onClick = vi.fn();
    render(
      <Menu>
        <Menu.Item label="Copy" onClick={onClick} />
      </Menu>,
    );
    await userEvent.click(screen.getByRole("menuitem", { name: "Copy" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables an item", () => {
    render(
      <Menu>
        <Menu.Item label="Copy" disabled />
      </Menu>,
    );
    expect(screen.getByRole("menuitem")).toBeDisabled();
  });
});
