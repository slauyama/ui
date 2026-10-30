import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { TabDef, Tabs } from "./tabs";

const tabs: TabDef[] = [
  { value: "flights", label: "Flights" },
  { value: "hotels", label: "Hotels" },
  { value: "cars", label: "Cars" },
];

function Controlled() {
  const [value, setValue] = useState("flights");
  return <Tabs tabs={tabs} value={value} onChange={setValue} />;
}

describe("Tabs", () => {
  it("is a tablist with the selected tab marked", () => {
    render(<Tabs tabs={tabs} value="hotels" />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Hotels" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Flights" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("makes only the selected tab tabbable", async () => {
    render(<Tabs tabs={tabs} value="hotels" />);
    await userEvent.tab();
    expect(screen.getByRole("tab", { name: "Hotels" })).toHaveFocus();
    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it("makes the first tab tabbable when none is selected", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "Flights" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("moves and selects with the arrow keys, wrapping at the ends", async () => {
    render(<Controlled />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowLeft}");
    const cars = screen.getByRole("tab", { name: "Cars" });
    expect(cars).toHaveFocus();
    expect(cars).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Flights" })).toHaveFocus();
  });

  it("jumps to the ends with Home and End", async () => {
    render(<Controlled />);
    await userEvent.tab();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Cars" })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Flights" })).toHaveFocus();
  });

  it("selects on click", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByRole("tab", { name: "Hotels" }));
    expect(screen.getByRole("tab", { name: "Hotels" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("links each tab to its panel when given an id", () => {
    render(<Tabs id="trip" tabs={tabs} value="flights" />);
    const tab = screen.getByRole("tab", { name: "Flights" });
    expect(tab).toHaveAttribute("id", "trip-flights");
    expect(tab).toHaveAttribute("aria-controls", "trip-flights-panel");
  });
});
