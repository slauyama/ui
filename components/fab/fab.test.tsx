import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Fab } from "./fab";

describe("Fab", () => {
  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<Fab icon="add" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is named by its label when extended", () => {
    render(<Fab icon="edit" label="Compose" />);
    const fab = screen.getByRole("button", { name: "Compose" });
    expect(fab).toHaveAttribute("data-extended", "true");
    expect(getComputedStyle(fab).height).toBe("56px");
  });

  it.each([
    ["small", "40px"],
    ["medium", "56px"],
    ["large", "96px"],
  ] as const)("is %s at %s", (size, px) => {
    render(<Fab icon="add" size={size} />);
    const style = getComputedStyle(screen.getByRole("button"));
    expect(style.width).toBe(px);
    expect(style.height).toBe(px);
  });
});
