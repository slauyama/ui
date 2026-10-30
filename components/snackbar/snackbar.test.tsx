import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Snackbar } from "./snackbar";

describe("Snackbar", () => {
  it("announces its message as a status", () => {
    render(<Snackbar message="Message archived" />);
    expect(screen.getByRole("status")).toHaveTextContent("Message archived");
  });

  it("renders nothing when closed", () => {
    render(<Snackbar open={false} message="Message archived" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("calls onAction from its action button", async () => {
    const onAction = vi.fn();
    render(
      <Snackbar message="Message archived" action="Undo" onAction={onAction} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("adds a dismiss button only with onClose", async () => {
    const onClose = vi.fn();
    const { rerender } = render(<Snackbar message="Saved" />);
    expect(
      screen.queryByRole("button", { name: "Dismiss" }),
    ).not.toBeInTheDocument();
    rerender(<Snackbar message="Saved" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
