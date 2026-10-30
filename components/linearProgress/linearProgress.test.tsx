import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LinearProgress } from "./linearProgress";

describe("LinearProgress", () => {
  it("is a named progressbar", () => {
    render(<LinearProgress label="Upload" value={0.6} />);
    expect(screen.getByRole("progressbar", { name: "Upload" })).toHaveAttribute(
      "aria-valuenow",
      "0.6",
    );
  });

  it("fills to the fraction of max", () => {
    render(<LinearProgress label="Upload" value={3} max={4} />);
    const fill = screen.getByRole("progressbar")
      .firstElementChild as HTMLElement;
    expect(fill.style.width).toBe("75%");
  });

  it("drops the value when indeterminate", () => {
    render(<LinearProgress label="Loading" value={0.6} indeterminate />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-indeterminate", "true");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });
});
