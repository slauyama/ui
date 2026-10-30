import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TextField } from "./textField";

describe("TextField", () => {
  it("is a textbox named by its label", () => {
    render(<TextField label="Email" />);
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("keeps its own value when uncontrolled", async () => {
    const onChange = vi.fn();
    render(<TextField label="Email" defaultValue="a" onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "da");
    expect(input).toHaveValue("ada");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("shows the placeholder only once focused", async () => {
    render(<TextField label="Email" placeholder="you@example.com" />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("placeholder");
    await userEvent.click(input);
    expect(input).toHaveAttribute("placeholder", "you@example.com");
  });

  it("is described by its supporting text", () => {
    render(<TextField label="Email" supportingText="We never share it" />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "We never share it",
    );
  });

  it("replaces the supporting text with the error and marks itself invalid", () => {
    render(
      <TextField
        label="Email"
        supportingText="We never share it"
        error
        errorText="Enter a valid email"
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Enter a valid email");
  });

  it("counts characters against counterMax", async () => {
    render(<TextField label="Bio" counterMax={20} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(screen.getByText("5/20")).toBeInTheDocument();
  });

  it("makes a clickable trailing icon a named button", async () => {
    const onTrailingClick = vi.fn();
    render(
      <TextField
        label="Search"
        trailingIcon="close"
        trailingIconLabel="Clear"
        onTrailingClick={onTrailingClick}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onTrailingClick).toHaveBeenCalledTimes(1);
  });

  it("leaves a decorative trailing icon out of the tab order", () => {
    render(<TextField label="Search" trailingIcon="search" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a textarea", () => {
    render(<TextField label="Notes" textarea rows={5} />);
    const area = screen.getByRole("textbox", { name: "Notes" });
    expect(area.tagName).toBe("TEXTAREA");
    expect(area).toHaveAttribute("rows", "5");
  });

  it("renders a prefix and suffix", () => {
    render(<TextField label="Price" prefix="$" suffix="USD" value="5" />);
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("disables its input", () => {
    render(<TextField label="Email" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
