import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("shows its value", () => {
    render(<Badge value={3} data-testid="badge" />);
    expect(screen.getByTestId("badge")).toHaveTextContent("3");
  });

  it("renders a dot with no text", () => {
    render(<Badge dot value={3} data-testid="badge" />);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("data-dot", "true");
    expect(badge).toBeEmptyDOMElement();
  });

  it("anchors to its child's top-right corner", () => {
    render(
      <Badge value={9} data-testid="badge">
        <button>Inbox</button>
      </Badge>,
    );
    const badge = screen.getByTestId("badge");
    const wrapper = badge.parentElement!;
    expect(wrapper).toContainElement(screen.getByRole("button"));
    expect(getComputedStyle(wrapper).position).toBe("relative");
    expect(getComputedStyle(badge).position).toBe("absolute");
  });

  it("stands alone without children", () => {
    render(<Badge value={1} data-testid="badge" />);
    expect(getComputedStyle(screen.getByTestId("badge")).position).toBe(
      "static",
    );
  });
});
