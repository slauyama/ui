import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavigationBar, NavItem } from "./navigationBar";

const items: NavItem[] = [
  { value: "home", label: "Home", icon: "home" },
  { value: "search", label: "Search", icon: "search" },
  { value: "inbox", label: "Inbox", icon: "inbox", badge: 3 },
];

describe("NavigationBar", () => {
  it("is a navigation landmark of buttons", () => {
    render(<NavigationBar aria-label="Main" items={items} value="home" />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.querySelectorAll("button")).toHaveLength(3);
  });

  it("marks the current destination", () => {
    render(<NavigationBar items={items} value="search" />);
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("reports the chosen destination", async () => {
    const onChange = vi.fn();
    render(<NavigationBar items={items} value="home" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onChange).toHaveBeenCalledWith("search");
  });

  it("shows a badge", () => {
    render(<NavigationBar items={items} value="home" />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
