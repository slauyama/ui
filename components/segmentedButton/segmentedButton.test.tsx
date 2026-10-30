import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { SegmentedButton, SegmentedOption } from "./segmentedButton";

const options: SegmentedOption[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

function Controlled({ multiselect = false }: { multiselect?: boolean }) {
  const [value, setValue] = useState<string | string[]>(
    multiselect ? [] : "day",
  );
  return (
    <SegmentedButton
      options={options}
      value={value}
      onChange={setValue}
      multiselect={multiselect}
    />
  );
}

describe("SegmentedButton", () => {
  it("is a group of toggle buttons", () => {
    render(<SegmentedButton options={options} value="week" />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Week" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Day" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("selects a single option", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: "Month" }));
    expect(screen.getByRole("button", { name: "Month" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Day" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles several options with multiselect", async () => {
    render(<Controlled multiselect />);
    const day = screen.getByRole("button", { name: "Day" });
    const week = screen.getByRole("button", { name: "Week" });
    await userEvent.click(day);
    await userEvent.click(week);
    expect(day).toHaveAttribute("aria-pressed", "true");
    expect(week).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(day);
    expect(day).toHaveAttribute("aria-pressed", "false");
  });
});
