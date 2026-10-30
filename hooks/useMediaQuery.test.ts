import { renderHook } from "@testing-library/react";
import { page } from "vitest/browser";
import { describe, expect, it } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  it("reports whether the query matches", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 1px)"));
    expect(result.current).toBe(true);
  });

  it("updates when the viewport changes", async () => {
    await page.viewport(1024, 768);
    const { result } = renderHook(() => useMediaQuery("(max-width: 640px)"));
    expect(result.current).toBe(false);
    await page.viewport(400, 768);
    await expect.poll(() => result.current).toBe(true);
  });
});
