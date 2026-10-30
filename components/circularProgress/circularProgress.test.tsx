import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CircularProgress } from "./circularProgress";

describe("CircularProgress", () => {
  it("is a named progressbar with its value range", () => {
    render(<CircularProgress label="Upload" value={0.6} />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "1");
    expect(bar).toHaveAttribute("aria-valuenow", "0.6");
  });

  it("announces string children as the value text", () => {
    render(
      <CircularProgress label="Upload" value={0.6}>
        60%
      </CircularProgress>,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuetext", "60%");
    expect(bar).toHaveTextContent("60%");
  });

  it("drops the value when indeterminate", () => {
    render(<CircularProgress label="Loading" value={0.6} indeterminate />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-indeterminate", "true");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).not.toHaveAttribute("aria-valuemax");
  });

  it("sizes the ring", () => {
    render(<CircularProgress label="Upload" size={72} />);
    const svg = screen.getByRole("progressbar").querySelector("svg")!;
    expect(svg).toHaveAttribute("width", "72");
    expect(svg).toHaveAttribute("height", "72");
  });
});
