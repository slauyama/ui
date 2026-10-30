import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

function Controlled() {
  const [selected, setSelected] = useState(false);
  return <Switch label="Wi-Fi" selected={selected} onChange={setSelected} />;
}

describe("Switch", () => {
  it("is a switch named by its label", () => {
    render(<Switch label="Wi-Fi" />);
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).not.toBeChecked();
  });

  it("toggles on click", async () => {
    render(<Controlled />);
    const toggle = screen.getByRole("switch");
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it("toggles with Space", async () => {
    render(<Controlled />);
    await userEvent.tab();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("shows a glyph for its state with icons", () => {
    render(<Switch label="Wi-Fi" selected icons />);
    expect(screen.getByRole("switch")).toHaveTextContent("check");
  });

  it("does not change when disabled", async () => {
    const onChange = vi.fn();
    render(<Switch label="Wi-Fi" disabled onChange={onChange} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });
});
