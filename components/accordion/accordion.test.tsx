import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./accordion";

describe("Accordion", () => {
  it("wires the trigger to its panel", () => {
    render(<Accordion headline="Shipping">Ships in 2 days.</Accordion>);
    const trigger = screen.getByRole("button", { name: "Shipping" });
    const panel = screen.getByRole("region", { hidden: true });
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("toggles on click and reports the new state", async () => {
    const onOpenChange = vi.fn();
    render(
      <Accordion headline="Shipping" onOpenChange={onOpenChange}>
        Ships in 2 days.
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Shipping" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("toggles with Enter and Space", async () => {
    render(<Accordion headline="Shipping">Ships in 2 days.</Accordion>);
    const trigger = screen.getByRole("button", { name: "Shipping" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("starts open with defaultOpen", () => {
    render(
      <Accordion headline="Shipping" defaultOpen>
        Ships in 2 days.
      </Accordion>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("makes a closed panel inert", async () => {
    render(
      <Accordion headline="Shipping">
        <a href="#policy">Policy</a>
      </Accordion>,
    );
    const link = screen.getByText("Policy");
    expect(link.closest("[role=region]")).toHaveProperty("inert", true);
    link.focus();
    expect(link).not.toHaveFocus();

    await userEvent.click(screen.getByRole("button", { name: "Shipping" }));
    expect(link.closest("[role=region]")).toHaveProperty("inert", false);
    link.focus();
    expect(link).toHaveFocus();
  });

  it("follows the open prop when controlled", async () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Accordion headline="Shipping" open={open} onOpenChange={setOpen}>
            Body
          </Accordion>
          <button onClick={() => setOpen(true)}>Open it</button>
        </>
      );
    }
    render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: "Open it" }));
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("does not change state on its own when controlled", async () => {
    render(
      <Accordion headline="Shipping" open={false}>
        Body
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "Shipping" });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the headline at the requested heading level", () => {
    render(
      <Accordion headline="Shipping" headingAs="h4">
        Body
      </Accordion>,
    );
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Shipping",
    );
  });
});
