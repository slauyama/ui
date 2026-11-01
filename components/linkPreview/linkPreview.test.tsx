import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LinkPreview } from "./linkPreview";

const THUMBNAIL = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

function isShown(el: HTMLElement) {
  return el.matches(":popover-open");
}

function renderPreview(props: Partial<Parameters<typeof LinkPreview>[0]> = {}) {
  render(
    <LinkPreview
      href="https://example.com"
      title="Example"
      description="An example site"
      image={THUMBNAIL}
      {...props}
    >
      Example link
    </LinkPreview>,
  );
  return {
    link: screen.getByRole("link", { name: "Example link" }),
    card: screen.getByRole("tooltip", { hidden: true }),
  };
}

describe("LinkPreview", () => {
  it("renders a real link described by its preview", () => {
    const { link } = renderPreview();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAccessibleDescription("Example An example site");
  });

  it("is not displayed while closed", () => {
    const { card } = renderPreview();
    expect(card).not.toBeVisible();
  });

  it("opens after a short hover delay and closes immediately on leave", async () => {
    const { link, card } = renderPreview();
    await userEvent.hover(link);
    expect(isShown(card)).toBe(false);
    await waitFor(() => expect(isShown(card)).toBe(true));
    await userEvent.unhover(link);
    expect(isShown(card)).toBe(false);
  });

  it("never opens when the pointer passes over quickly", async () => {
    const { link, card } = renderPreview();
    await userEvent.hover(link);
    await userEvent.unhover(link);
    await new Promise((r) => setTimeout(r, 400));
    expect(isShown(card)).toBe(false);
  });

  it("opens on focus and hides on Escape", async () => {
    const { card } = renderPreview();
    await userEvent.tab();
    await waitFor(() => expect(isShown(card)).toBe(true));
    await userEvent.keyboard("{Escape}");
    expect(isShown(card)).toBe(false);
  });

  it("hides on blur", async () => {
    const { card } = renderPreview();
    await userEvent.tab();
    await waitFor(() => expect(isShown(card)).toBe(true));
    await userEvent.tab();
    expect(isShown(card)).toBe(false);
  });

  it("shows the thumbnail only when an image is given", () => {
    const { card } = renderPreview();
    expect(card.querySelector("img")).toHaveAttribute("src", THUMBNAIL);
  });

  it("omits the thumbnail without an image", () => {
    const { card } = renderPreview({ image: undefined });
    expect(card.querySelector("img")).toBeNull();
  });

  it("still calls the link's own handlers", async () => {
    const onMouseEnter = vi.fn();
    const onFocus = vi.fn();
    const { link } = renderPreview({ onMouseEnter, onFocus });
    await userEvent.hover(link);
    await userEvent.tab();
    expect(onMouseEnter).toHaveBeenCalled();
    expect(link).toHaveFocus();
    expect(onFocus).toHaveBeenCalled();
  });

  it("records its placement", () => {
    const { card } = renderPreview({ placement: "bottom" });
    expect(card).toHaveAttribute("data-placement", "bottom");
  });
});
