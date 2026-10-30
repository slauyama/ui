import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavigationRail, NavItem } from "./navigationRail";

const items: NavItem[] = [
  { value: "home", label: "Home", icon: "home" },
  { value: "search", label: "Search", icon: "search" },
];

describe("NavigationRail", () => {
  it("marks the current destination", () => {
    render(<NavigationRail items={items} value="search" />);
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
    render(<NavigationRail items={items} value="home" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onChange).toHaveBeenCalledWith("search");
  });

  it("renders a top slot above the destinations", () => {
    render(<NavigationRail items={items} top={<button>Compose</button>} />);
    const [first] = screen.getAllByRole("button");
    expect(first).toHaveAccessibleName("Compose");
  });

  it("centres its destinations", () => {
    render(<NavigationRail items={items} align="center" />);
    expect(
      getComputedStyle(screen.getByRole("navigation")).justifyContent,
    ).toBe("center");
  });
});
