import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Select, SelectOption } from "./select";

const options: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function Controlled({ initial }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  return (
    <Select label="Fruit" options={options} value={value} onChange={setValue} />
  );
}

async function expectOpen(combobox: HTMLElement, open: boolean) {
  await waitFor(() =>
    expect(combobox).toHaveAttribute("aria-expanded", String(open)),
  );
}

describe("Select", () => {
  it("is a combobox controlling a listbox", () => {
    render(<Controlled />);
    const combobox = screen.getByRole("combobox", { name: "Fruit" });
    const listbox = screen.getByRole("listbox", { hidden: true });
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    expect(combobox).toHaveAttribute("aria-controls", listbox.id);
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on click and chooses an option", async () => {
    render(<Controlled />);
    const combobox = screen.getByRole("combobox");
    await userEvent.click(combobox);
    await expectOpen(combobox, true);
    await userEvent.click(screen.getByRole("option", { name: "Banana" }));
    await expectOpen(combobox, false);
    expect(combobox).toHaveTextContent("Banana");
  });

  it("marks the selected option", async () => {
    render(<Controlled initial="cherry" />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "Cherry" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("option", { name: "Apple" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("moves the active option with the arrow keys and chooses with Enter", async () => {
    render(<Controlled />);
    const combobox = screen.getByRole("combobox");
    await userEvent.tab();
    await userEvent.keyboard("{ArrowDown}");
    await expectOpen(combobox, true);
    const [apple, banana] = screen.getAllByRole("option");
    expect(combobox).toHaveAttribute("aria-activedescendant", apple.id);
    await userEvent.keyboard("{ArrowDown}");
    expect(combobox).toHaveAttribute("aria-activedescendant", banana.id);
    await userEvent.keyboard("{Enter}");
    await expectOpen(combobox, false);
    expect(combobox).toHaveTextContent("Banana");
  });

  it("jumps to the ends with Home and End", async () => {
    render(<Controlled />);
    const combobox = screen.getByRole("combobox");
    await userEvent.tab();
    await userEvent.keyboard(" ");
    await expectOpen(combobox, true);
    const all = screen.getAllByRole("option");
    await userEvent.keyboard("{End}");
    expect(combobox).toHaveAttribute("aria-activedescendant", all[2].id);
    await userEvent.keyboard("{Home}");
    expect(combobox).toHaveAttribute("aria-activedescendant", all[0].id);
  });

  it("closes on Escape without choosing", async () => {
    render(<Controlled initial="apple" />);
    const combobox = screen.getByRole("combobox");
    await userEvent.tab();
    await userEvent.keyboard("{ArrowDown}");
    await expectOpen(combobox, true);
    await userEvent.keyboard("{ArrowDown}{Escape}");
    await expectOpen(combobox, false);
    expect(combobox).toHaveTextContent("Apple");
  });

  it("can't be focused or opened when disabled", async () => {
    render(<Select label="Fruit" options={options} disabled />);
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-disabled", "true");
    await userEvent.tab();
    expect(combobox).not.toHaveFocus();
    await userEvent.setup({ pointerEventsCheck: 0 }).click(combobox);
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });
});
