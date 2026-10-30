import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./divider";

describe("Divider", () => {
  it("is a separator one pixel tall", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider.tagName).toBe("HR");
    expect(getComputedStyle(divider).height).toBe("1px");
  });

  it("is one pixel wide when vertical", () => {
    render(<Divider vertical />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("data-vertical", "true");
    expect(getComputedStyle(divider).width).toBe("1px");
  });

  it("insets both sides", () => {
    render(<Divider inset />);
    const style = getComputedStyle(screen.getByRole("separator"));
    expect(style.marginLeft).toBe("16px");
    expect(style.marginRight).toBe("16px");
  });

  it("insets only the leading side", () => {
    render(<Divider insetStart />);
    const style = getComputedStyle(screen.getByRole("separator"));
    expect(style.marginLeft).toBe("16px");
    expect(style.marginRight).toBe("0px");
  });
});
