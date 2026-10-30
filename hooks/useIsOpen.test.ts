import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useIsOpen } from "./useIsOpen";

describe("useIsOpen", () => {
  it("opens and closes", () => {
    const { result } = renderHook(() => useIsOpen());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it("can start open", () => {
    const { result } = renderHook(() => useIsOpen(true));
    expect(result.current.isOpen).toBe(true);
  });
});
