import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DrawerEntry, NavigationDrawer } from "./navigationDrawer";

const items: DrawerEntry[] = [
  { heading: "Mail" },
  { value: "inbox", label: "Inbox", icon: "inbox", badge: "24" },
  { value: "sent", label: "Sent", icon: "send" },
];

describe("NavigationDrawer", () => {
  it("renders headings between destinations", () => {
    render(<NavigationDrawer items={items} value="inbox" />);
    expect(screen.getByRole("heading", { name: "Mail" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("marks the current destination", () => {
    render(<NavigationDrawer items={items} value="sent" />);
    expect(screen.getByRole("button", { name: "Sent" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("reports the chosen destination", async () => {
    const onChange = vi.fn();
    render(
      <NavigationDrawer items={items} value="inbox" onChange={onChange} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Sent" }));
    expect(onChange).toHaveBeenCalledWith("sent");
  });

  it("renders a header", () => {
    render(<NavigationDrawer items={items} header={<p>Ada Lovelace</p>} />);
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
  });
});
