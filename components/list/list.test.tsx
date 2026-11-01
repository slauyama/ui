import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { List } from "./list";

describe("List", () => {
  it("puts dividers between rows only", () => {
    render(
      <List dividers>
        <List.Item headline="Inbox" />
        <List.Item headline="Sent" />
        <List.Item headline="Drafts" />
      </List>,
    );
    expect(screen.getAllByRole("separator")).toHaveLength(2);
  });

  it("renders a plain row that isn't interactive", () => {
    render(<List.Item headline="Inbox" supportingText="3 unread" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("Inbox")).toBeInTheDocument();
    expect(screen.getByText("3 unread")).toBeInTheDocument();
  });

  it("becomes a button when clickable", async () => {
    const onClick = vi.fn();
    render(
      <List.Item headline="Inbox" leadingIcon="inbox" onClick={onClick} />,
    );
    const row = screen.getByRole("button", { name: "Inbox" });
    await userEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("becomes a link when given href", () => {
    render(<List.Item headline="Inbox" href="/inbox" />);
    expect(screen.getByRole("link", { name: "Inbox" })).toHaveAttribute(
      "href",
      "/inbox",
    );
  });

  it("labels its checkbox with the whole row", async () => {
    const onCheckedChange = vi.fn();
    render(
      <List.Item
        headline="Wi-Fi"
        control="checkbox"
        onCheckedChange={onCheckedChange}
      />,
    );
    const box = screen.getByRole("checkbox", { name: "Wi-Fi" });
    await userEvent.click(screen.getByText("Wi-Fi"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(box.closest("label")).toBeInTheDocument();
  });

  it("groups radio rows by name", () => {
    render(
      <List>
        <List.Item headline="Small" control="radio" name="size" value="s" />
        <List.Item
          headline="Large"
          control="radio"
          name="size"
          value="l"
          checked
        />
      </List>,
    );
    expect(screen.getByRole("radio", { name: "Small" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Large" })).toBeChecked();
  });

  it.each([
    [1, "56px"],
    [2, "72px"],
    [3, "88px"],
  ] as const)("is at least %i line(s) tall", (lines, px) => {
    render(<List.Item headline="Inbox" lines={lines} data-testid="row" />);
    expect(getComputedStyle(screen.getByTestId("row")).minHeight).toBe(px);
  });

  describe("adding and removing rows", () => {
    function rows(names: string[]) {
      return (
        <List>
          {names.map((name) => (
            <List.Item key={name} headline={name} />
          ))}
        </List>
      );
    }
    function wrapperOf(text: string) {
      return screen.getByText(text).closest("[role=group] > *") as HTMLElement;
    }

    it("doesn't animate the rows of the first render", () => {
      render(rows(["Inbox", "Sent"]));
      expect(getComputedStyle(wrapperOf("Inbox")).opacity).toBe("1");
    });

    it("slides an added row in from the left", async () => {
      const { rerender } = render(rows(["Sent"]));
      rerender(rows(["Inbox", "Sent"]));
      const added = wrapperOf("Inbox");
      await waitFor(() => {
        const matrix = new DOMMatrix(getComputedStyle(added).transform);
        expect(matrix.e).toBeLessThan(0);
      });
      await waitFor(() => {
        expect(getComputedStyle(added).opacity).toBe("1");
        expect(getComputedStyle(added).transform).toBe("none");
      });
    });
  });

  describe("shared hover highlight", () => {
    function highlight() {
      return screen
        .getByRole("group")
        .querySelector<HTMLElement>(":scope > [aria-hidden=true]");
    }

    it("snaps to the first hovered row, glides to the next and leaves with the pointer", async () => {
      render(
        <List>
          <List.Item headline="Inbox" onClick={() => {}} />
          <List.Item headline="Sent" onClick={() => {}} />
        </List>,
      );
      const [inbox, sent] = screen.getAllByRole("button");
      await userEvent.hover(inbox);
      expect(highlight()!.className).not.toMatch(/--motion-glide/);
      expect(highlight()!.getBoundingClientRect().top).toBe(
        inbox.getBoundingClientRect().top,
      );
      await userEvent.hover(sent);
      expect(highlight()!.className).toMatch(/--motion-glide/);
      await waitFor(() =>
        expect(highlight()!.getBoundingClientRect().top).toBeCloseTo(
          sent.getBoundingClientRect().top,
          0,
        ),
      );
      expect(getComputedStyle(sent, "::before").opacity).toBe("0");
      await userEvent.unhover(screen.getByRole("group"));
      expect(highlight()).toBeNull();
    });

    it("skips rows that aren't interactive or are disabled", async () => {
      render(
        <List>
          <List.Item headline="Static" />
          <List.Item headline="Off" onClick={() => {}} disabled />
        </List>,
      );
      await userEvent.hover(screen.getByText("Static"));
      expect(highlight()).toBeNull();
      await userEvent
        .setup({ pointerEventsCheck: 0 })
        .hover(screen.getByText("Off"));
      expect(highlight()).toBeNull();
    });
  });
});
