import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useHideOnScroll } from "./useHideOnScroll";

describe("useHideOnScroll", () => {
  let spacer: HTMLDivElement;
  const bar = { current: document.createElement("div") };

  beforeEach(() => {
    spacer = document.createElement("div");
    spacer.style.height = "5000px";
    document.body.append(spacer);
    bar.current.style.height = "64px";
    document.body.prepend(bar.current);
  });

  afterEach(() => {
    window.scrollTo(0, 0);
    spacer.remove();
    bar.current.remove();
  });

  it("hides on scroll down and shows on scroll up", async () => {
    const { result } = renderHook(() => useHideOnScroll(bar));
    expect(result.current).toBe(false);
    window.scrollTo(0, 600);
    await expect.poll(() => result.current).toBe(true);
    window.scrollTo(0, 400);
    await expect.poll(() => result.current).toBe(false);
  });

  it("stays shown while scrolled within its own height", async () => {
    const { result } = renderHook(() => useHideOnScroll(bar));
    const scrolled = new Promise((r) =>
      window.addEventListener("scroll", r, { once: true }),
    );
    window.scrollTo(0, 40);
    await scrolled;
    expect(result.current).toBe(false);
  });
});
