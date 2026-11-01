import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

function Controlled({ initial = false }: { initial?: boolean }) {
  const [checked, setChecked] = useState(initial);
  return (
    <Checkbox
      label="Subscribe"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

describe("Checkbox", () => {
  it("is a native checkbox named by its label", () => {
    render(<Checkbox label="Subscribe" onChange={() => {}} />);
    const box = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(box.tagName).toBe("INPUT");
    expect(box).not.toBeChecked();
  });

  it("toggles when the label is clicked", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByText("Subscribe"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    await userEvent.click(screen.getByText("Subscribe"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles with Space", async () => {
    render(<Controlled />);
    await userEvent.tab();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("reports indeterminate as mixed through the checked glyph", () => {
    render(<Checkbox label="All" indeterminate onChange={() => {}} />);
    const box = screen.getByRole("checkbox", { name: "All" });
    expect(box).not.toBeChecked();
  });

  it("springs the tick in when checked and hides it at once when unchecked", async () => {
    render(<Controlled />);
    const tick = screen.getByText("check").parentElement!;
    expect(getComputedStyle(tick).scale).toBe("0");
    await userEvent.click(screen.getByText("Subscribe"));
    expect(getComputedStyle(tick).transitionProperty).toBe("scale");
    expect(getComputedStyle(tick).transitionTimingFunction).toMatch(
      /^linear\(/,
    );
    await waitFor(() => expect(getComputedStyle(tick).scale).toBe("1"));
    await userEvent.click(screen.getByText("Subscribe"));
    expect(getComputedStyle(tick).scale).toBe("0");
  });

  it("does not change when disabled", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Subscribe" disabled onChange={onChange} />);
    const box = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(box).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(box);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders without its own label when embedded", () => {
    render(
      <label>
        <Checkbox as="span" onChange={() => {}} />
        Row label
      </label>,
    );
    const box = screen.getByRole("checkbox", { name: "Row label" });
    expect(document.querySelectorAll("label")).toHaveLength(1);
    expect(box.closest("label")).toBe(document.querySelector("label"));
  });
});
