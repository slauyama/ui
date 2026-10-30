import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./icon";

describe("Icon", () => {
  it("renders the glyph name hidden from assistive tech", () => {
    render(<Icon name="home" data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveTextContent("home");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("sizes and fills through the font", () => {
    render(<Icon name="star" size={32} filled data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-filled", "true");
    expect(getComputedStyle(icon).fontSize).toBe("32px");
    expect(icon.style.fontVariationSettings).toContain('"FILL" 1');
  });

  it("overrides the inherited colour", () => {
    render(<Icon name="star" color="rgb(0, 128, 0)" data-testid="icon" />);
    expect(getComputedStyle(screen.getByTestId("icon")).color).toBe(
      "rgb(0, 128, 0)",
    );
  });
});
