import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Radio } from "./radio";

function Group() {
  const [value, setValue] = useState("s");
  return (
    <>
      {["s", "m", "l"].map((v) => (
        <Radio
          key={v}
          name="size"
          value={v}
          label={v.toUpperCase()}
          checked={value === v}
          onChange={(e) => setValue(e.target.value)}
        />
      ))}
    </>
  );
}

describe("Radio", () => {
  it("is a native radio named by its label", () => {
    render(<Radio label="Small" name="size" value="s" onChange={() => {}} />);
    const radio = screen.getByRole("radio", { name: "Small" });
    expect(radio.tagName).toBe("INPUT");
    expect(radio).toHaveAttribute("name", "size");
  });

  it("selects one option in its group at a time", async () => {
    render(<Group />);
    await userEvent.click(screen.getByText("M"));
    expect(screen.getByRole("radio", { name: "M" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "S" })).not.toBeChecked();
  });

  it("does not change when disabled", async () => {
    const onChange = vi.fn();
    render(<Radio label="Small" disabled onChange={onChange} />);
    const radio = screen.getByRole("radio", { name: "Small" });
    expect(radio).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders without its own label when embedded", () => {
    render(
      <label>
        <Radio as="span" onChange={() => {}} />
        Row label
      </label>,
    );
    expect(
      screen.getByRole("radio", { name: "Row label" }),
    ).toBeInTheDocument();
    expect(document.querySelectorAll("label")).toHaveLength(1);
  });
});
