import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "../chip/chip";
import { ChipSet } from "./chipSet";

describe("ChipSet", () => {
  it("groups its chips", () => {
    render(
      <ChipSet aria-label="Filters">
        <Chip variant="filter" label="Nearby" />
        <Chip variant="filter" label="Open now" />
      </ChipSet>,
    );
    const group = screen.getByRole("group", { name: "Filters" });
    expect(within(group).getAllByRole("button")).toHaveLength(2);
  });

  it("wraps onto new lines", () => {
    render(<ChipSet aria-label="Filters" />);
    expect(getComputedStyle(screen.getByRole("group")).flexWrap).toBe("wrap");
  });
});
