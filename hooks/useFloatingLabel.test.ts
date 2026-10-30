import { act, renderHook } from "@testing-library/react";
import { ChangeEvent, FocusEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import { useFloatingLabel } from "./useFloatingLabel";

function change(value: string) {
  return { target: { value } } as ChangeEvent<HTMLInputElement>;
}
const focusEvent = {} as FocusEvent<HTMLInputElement>;

describe("useFloatingLabel", () => {
  it("floats while focused", () => {
    const { result } = renderHook(() => useFloatingLabel({}));
    expect(result.current.floated).toBe(false);
    act(() => result.current.handleFocus(focusEvent));
    expect(result.current.floated).toBe(true);
    act(() => result.current.handleBlur(focusEvent));
    expect(result.current.floated).toBe(false);
  });

  it("floats while holding a value", () => {
    const { result } = renderHook(() => useFloatingLabel({}));
    act(() => result.current.handleChange(change("a")));
    expect(result.current.value).toBe("a");
    expect(result.current.floated).toBe(true);
  });

  it("follows the value prop when controlled", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useFloatingLabel({ value, onChange }),
      { initialProps: { value: "" } },
    );
    act(() => result.current.handleChange(change("a")));
    expect(onChange).toHaveBeenCalled();
    expect(result.current.value).toBe("");
    rerender({ value: "a" });
    expect(result.current.floated).toBe(true);
  });

  it("always floats when forced", () => {
    const { result } = renderHook(() =>
      useFloatingLabel({ forceFloated: true }),
    );
    expect(result.current.floated).toBe(true);
  });
});
