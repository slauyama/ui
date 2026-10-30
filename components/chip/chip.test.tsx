import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./chip";

describe("Chip", () => {
  it("is a button named by its label", async () => {
    const onClick = vi.fn();
    render(<Chip label="Nearby" icon="near_me" onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "Nearby" });
    expect(chip).toHaveAttribute("type", "button");
    await userEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("exposes filter selection with aria-pressed", () => {
    render(
      <>
        <Chip variant="filter" label="Open now" selected />
        <Chip variant="filter" label="Top rated" />
      </>,
    );
    expect(screen.getByRole("button", { name: "Open now" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Top rated" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("swaps a selected filter chip's icon for a check", () => {
    render(<Chip variant="filter" label="Open now" icon="schedule" selected />);
    expect(screen.getByRole("button")).toHaveTextContent("check");
    expect(screen.getByRole("button")).not.toHaveTextContent("schedule");
  });

  it("has no aria-pressed when it isn't a filter", () => {
    render(<Chip variant="assist" label="Add to calendar" />);
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed");
  });

  it("calls onRemove without triggering onClick", async () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    render(
      <Chip
        variant="input"
        label="Ada"
        onClick={onClick}
        onRemove={onRemove}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove Ada" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(<Chip label="Nearby" disabled onClick={onClick} />);
    const chip = screen.getByRole("button", { name: "Nearby" });
    expect(chip).toBeDisabled();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(chip);
    expect(onClick).not.toHaveBeenCalled();
  });
});
