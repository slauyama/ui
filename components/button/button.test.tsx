import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders a button that calls onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is activated by Enter and Space", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a link when given href", () => {
    render(
      <Button href="/docs" target="_blank">
        Docs
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("falls back to a disabled button when a link is disabled", () => {
    render(
      <Button href="/docs" disabled>
        Docs
      </Button>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Docs" })).toBeDisabled();
  });

  it("keeps icons out of the accessible name", () => {
    render(
      <Button icon="add" trailingIcon="arrow_forward">
        Create
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleName("Create");
  });

  it("defaults to the filled variant", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "filled",
    );
  });
});
