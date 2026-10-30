import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NumberedList } from "./numberedList";

describe("NumberedList", () => {
  it("is an ordered list with decimal markers", () => {
    render(
      <NumberedList>
        <NumberedList.Item>Preheat the oven</NumberedList.Item>
        <NumberedList.Item>Mix the batter</NumberedList.Item>
      </NumberedList>,
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(getComputedStyle(list).listStyleType).toBe("decimal");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("passes native list attributes through", () => {
    render(
      <NumberedList start={3}>
        <NumberedList.Item>Bake</NumberedList.Item>
      </NumberedList>,
    );
    expect(screen.getByRole("list")).toHaveAttribute("start", "3");
  });
});
