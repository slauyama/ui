import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./dialog";

function Opener() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        variant="default"
        headline="Delete file?"
        actions={<button onClick={() => setOpen(false)}>Cancel</button>}
      >
        This can't be undone.
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("opens as a modal named by its headline", () => {
    render(
      <Dialog open variant="default" headline="Delete file?">
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog", { name: "Delete file?" });
    expect(dialog).toHaveProperty("open", true);
    expect(dialog.matches(":modal")).toBe(true);
  });

  it("renders nothing when closed", () => {
    render(<Dialog headline="Delete file?">Body</Dialog>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("returns focus to the opener when it closes", async () => {
    render(<Opener />);
    const opener = screen.getByRole("button", { name: "Delete" });
    await userEvent.click(opener);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it("asks to close on Escape instead of closing itself", () => {
    const onClose = vi.fn();
    render(
      <Dialog open variant="default" headline="Delete file?" onClose={onClose}>
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog");
    const cancel = new Event("cancel", { cancelable: true });
    fireEvent(dialog, cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(onClose).toHaveBeenCalled();
  });

  it("closes when the backdrop is clicked but not the surface", () => {
    const onClose = vi.fn();
    render(
      <Dialog open variant="default" headline="Delete file?" onClose={onClose}>
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog");
    const r = dialog.getBoundingClientRect();
    fireEvent.click(dialog, { clientX: r.left + 10, clientY: r.top + 10 });
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(dialog, { clientX: r.left - 10, clientY: r.top - 10 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("puts the actions and a close button in the header when full-screen", async () => {
    const onClose = vi.fn();
    render(
      <Dialog
        open
        variant="full-screen"
        headline="New event"
        onClose={onClose}
        actions={<button>Save</button>}
      >
        Body
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-layout", "full-screen");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("shows a hero icon and centres the headline", () => {
    render(
      <Dialog open variant="default" icon="delete" headline="Delete file?">
        Body
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("data-centered", "true");
    expect(
      getComputedStyle(screen.getByRole("heading", { name: "Delete file?" }))
        .textAlign,
    ).toBe("center");
  });
});
