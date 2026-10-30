import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./slider";

function Controlled({ initial = 50, step = 1 }) {
  const [value, setValue] = useState(initial);
  return (
    <Slider aria-label="Volume" value={value} step={step} onChange={setValue} />
  );
}

describe("Slider", () => {
  it("exposes its range and value", () => {
    render(
      <Slider
        aria-label="Volume"
        min={10}
        max={90}
        value={40}
        format={(v) => v + "%"}
      />,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "90");
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    expect(slider).toHaveAttribute("aria-valuetext", "40%");
  });

  it.each([
    ["{ArrowRight}", "51"],
    ["{ArrowUp}", "51"],
    ["{ArrowLeft}", "49"],
    ["{ArrowDown}", "49"],
    ["{PageUp}", "60"],
    ["{PageDown}", "40"],
    ["{Home}", "0"],
    ["{End}", "100"],
  ])("moves with %s", async (key, expected) => {
    render(<Controlled />);
    await userEvent.tab();
    await userEvent.keyboard(key);
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-valuenow",
      expected,
    );
  });

  it("clamps to its range", async () => {
    render(<Controlled initial={98} step={5} />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "100");
  });

  it("jumps to where the track is pressed", async () => {
    render(<Controlled initial={0} step={10} />);
    const slider = screen.getByRole("slider");
    const { left, width, top } = slider.getBoundingClientRect();
    await userEvent.pointer({
      keys: "[MouseLeft]",
      target: slider,
      coords: { clientX: left + width * 0.7, clientY: top + 20 },
    });
    expect(slider).toHaveAttribute("aria-valuenow", "70");
  });

  it("can't be focused or changed when disabled", async () => {
    const onChange = vi.fn();
    render(
      <Slider aria-label="Volume" value={50} disabled onChange={onChange} />,
    );
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");
    await userEvent.tab();
    expect(slider).not.toHaveFocus();
  });
});
