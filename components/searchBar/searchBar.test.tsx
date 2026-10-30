import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./searchBar";

describe("SearchBar", () => {
  it("names its input by the placeholder", () => {
    render(<SearchBar placeholder="Search mail" />);
    expect(
      screen.getByRole("textbox", { name: "Search mail" }),
    ).toHaveAttribute("placeholder", "Search mail");
  });

  it("submits the typed query on Enter", async () => {
    const onSubmit = vi.fn();
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <SearchBar
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={onSubmit}
        />
      );
    }
    render(<Controlled />);
    await userEvent.type(screen.getByRole("textbox"), "invoices{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("invoices");
  });

  it("renders a trailing slot", () => {
    render(<SearchBar trailing={<button>Voice search</button>} />);
    expect(
      screen.getByRole("button", { name: "Voice search" }),
    ).toBeInTheDocument();
  });
});
