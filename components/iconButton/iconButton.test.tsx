import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./iconButton";

describe("IconButton", () => {
  it("is a button named by its label", async () => {
    const onClick = vi.fn();
    render(<IconButton icon="delete" label="Delete" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("exposes toggle state with aria-pressed and swaps its glyph", () => {
    render(
      <IconButton
        icon="bookmark"
        selectedIcon="bookmark_added"
        label="Bookmark"
        selected
      />,
    );
    const button = screen.getByRole("button", { name: "Bookmark" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveTextContent("bookmark_added");
  });

  it("has no aria-pressed when it isn't a toggle", () => {
    render(<IconButton icon="delete" label="Delete" />);
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed");
  });

  it("renders a link when given href", () => {
    render(
      <IconButton
        icon="open_in_new"
        label="Docs"
        href="/docs"
        target="_blank"
      />,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <IconButton icon="delete" label="Delete" disabled onClick={onClick} />,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
