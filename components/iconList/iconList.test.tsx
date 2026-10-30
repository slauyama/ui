import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconList } from "./iconList";

describe("IconList", () => {
  it("is a list of items", () => {
    render(
      <IconList>
        <IconList.Item>Free shipping</IconList.Item>
        <IconList.Item>30-day returns</IconList.Item>
      </IconList>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Free shipping");
  });

  it("uses the list's icon for every item", () => {
    render(
      <IconList iconProps={{ name: "check" }}>
        <IconList.Item>Free shipping</IconList.Item>
      </IconList>,
    );
    expect(screen.getByText("check")).toHaveAttribute("aria-hidden", "true");
  });

  it("lets an item override the list's icon", () => {
    render(
      <IconList iconProps={{ name: "check" }}>
        <IconList.Item iconProps={{ name: "close" }}>No warranty</IconList.Item>
      </IconList>,
    );
    expect(screen.getByText("close")).toBeInTheDocument();
    expect(screen.queryByText("check")).not.toBeInTheDocument();
  });
});
