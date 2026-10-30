import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline } from "./timeline";

describe("Timeline", () => {
  it("is an ordered list of items", () => {
    render(
      <Timeline>
        <Timeline.Item headline="Ordered" timestamp="9:00" />
        <Timeline.Item headline="Shipped" status="in-progress" />
        <Timeline.Item headline="Delivered" status="incomplete" />
      </Timeline>,
    );
    expect(screen.getByRole("list").tagName).toBe("OL");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("marks the in-progress item as the current step", () => {
    render(
      <Timeline>
        <Timeline.Item headline="Ordered" />
        <Timeline.Item headline="Shipped" status="in-progress" />
      </Timeline>,
    );
    const [ordered, shipped] = screen.getAllByRole("listitem");
    expect(ordered).not.toHaveAttribute("aria-current");
    expect(shipped).toHaveAttribute("aria-current", "step");
  });

  it("puts the timestamp before the headline", () => {
    render(
      <Timeline>
        <Timeline.Item headline="Ordered" timestamp="9:00">
          Paid by card
        </Timeline.Item>
      </Timeline>,
    );
    expect(screen.getByRole("listitem")).toHaveTextContent(
      "9:00OrderedPaid by card",
    );
  });

  it("solid-lines after complete items and dots after the rest", () => {
    render(
      <Timeline>
        <Timeline.Item headline="Ordered" />
        <Timeline.Item headline="Shipped" status="in-progress" />
        <Timeline.Item headline="Delivered" status="incomplete" />
      </Timeline>,
    );
    const lines = screen
      .getAllByRole("listitem")
      .map((li) => li.querySelector("[aria-hidden] > span:last-child")!);
    expect(getComputedStyle(lines[0]).borderLeftStyle).toBe("solid");
    expect(getComputedStyle(lines[1]).borderLeftStyle).toBe("dotted");
    expect(getComputedStyle(lines[2]).display).toBe("none");
  });
});
