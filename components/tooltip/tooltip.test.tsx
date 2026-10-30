import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./tooltip";

function isShown(el: HTMLElement) {
  return el.matches(":popover-open");
}

describe("Tooltip", () => {
  it("describes its trigger", () => {
    render(
      <Tooltip label="Delete forever">
        <button>Delete</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleDescription(
      "Delete forever",
    );
  });

  it("shows on hover and hides on leave", async () => {
    render(
      <Tooltip label="Delete forever">
        <button>Delete</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    expect(isShown(tooltip)).toBe(false);
    await userEvent.hover(screen.getByRole("button"));
    expect(isShown(tooltip)).toBe(true);
    await userEvent.unhover(screen.getByRole("button"));
    expect(isShown(tooltip)).toBe(false);
  });

  it("shows on focus and hides on Escape", async () => {
    render(
      <Tooltip label="Delete forever">
        <button>Delete</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    await userEvent.tab();
    expect(isShown(tooltip)).toBe(true);
    await userEvent.keyboard("{Escape}");
    expect(isShown(tooltip)).toBe(false);
  });

  it("hides on blur", async () => {
    render(
      <Tooltip label="Delete forever">
        <button>Delete</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    await userEvent.tab();
    await userEvent.tab();
    expect(isShown(tooltip)).toBe(false);
  });

  it("records its placement", () => {
    render(
      <Tooltip label="Delete forever" placement="right">
        <button>Delete</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveAttribute(
      "data-placement",
      "right",
    );
  });
});
