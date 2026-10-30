import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopAppBar } from "./topAppBar";

describe("TopAppBar", () => {
  it("is a banner with the title as its h1", () => {
    render(<TopAppBar title="Inbox" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Inbox",
    );
  });

  it("places leading before the title and actions after", () => {
    render(
      <TopAppBar
        title="Inbox"
        leading={<button>Menu</button>}
        actions={<button>Search</button>}
      />,
    );
    expect(screen.getByRole("banner")).toHaveTextContent("MenuInboxSearch");
  });

  it.each(["small", "small-centered"] as const)("is %s at 64px", (variant) => {
    render(<TopAppBar variant={variant} title="Inbox" />);
    expect(getComputedStyle(screen.getByRole("banner")).height).toBe("64px");
  });

  it.each([
    ["medium", "112px"],
    ["large", "152px"],
  ] as const)("is %s at least %s", (variant, px) => {
    render(<TopAppBar variant={variant} title="Inbox" />);
    expect(getComputedStyle(screen.getByRole("banner")).minHeight).toBe(px);
  });

  it("centres the title", () => {
    render(<TopAppBar variant="small-centered" title="Inbox" />);
    expect(getComputedStyle(screen.getByRole("heading")).textAlign).toBe(
      "center",
    );
  });
});
