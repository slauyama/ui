import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTableSort } from "./useTableSort";

const rows = [
  { name: "Cherry", size: 3, added: new Date(2024, 2, 1) },
  { name: "apple", size: 10, added: new Date(2024, 0, 1) },
  { name: "Banana", size: 2, added: new Date(2024, 1, 1) },
];

function names(r: typeof rows) {
  return r.map((row) => row.name);
}

describe("useTableSort", () => {
  it("sorts strings with the locale", () => {
    const { result } = renderHook(() => useTableSort(rows, "name"));
    expect(names(result.current.sortedTableRows)).toEqual([
      "apple",
      "Banana",
      "Cherry",
    ]);
  });

  it("sorts numbers and dates by value", () => {
    const bySize = renderHook(() => useTableSort(rows, "size")).result;
    expect(bySize.current.sortedTableRows.map((r) => r.size)).toEqual([
      2, 3, 10,
    ]);
    const byDate = renderHook(() => useTableSort(rows, "added")).result;
    expect(names(byDate.current.sortedTableRows)).toEqual([
      "apple",
      "Banana",
      "Cherry",
    ]);
  });

  it("flips direction on the same field and resets on a new one", () => {
    const { result } = renderHook(() => useTableSort(rows, "name"));
    act(() => result.current.toggleSort("name"));
    expect(result.current.sortDirection).toBe("desc");
    expect(names(result.current.sortedTableRows)[0]).toBe("Cherry");
    act(() => result.current.toggleSort("size"));
    expect(result.current.sortField).toBe("size");
    expect(result.current.sortDirection).toBe("asc");
  });

  it("uses a custom comparator", () => {
    const { result } = renderHook(() =>
      useTableSort(rows, "name", {
        comparator: (a, b) => a.name.length - b.name.length,
        initialDirection: "desc",
      }),
    );
    expect(names(result.current.sortedTableRows)[2]).toBe("apple");
  });

  it("doesn't mutate the input", () => {
    renderHook(() => useTableSort(rows, "size"));
    expect(names(rows)).toEqual(["Cherry", "apple", "Banana"]);
  });
});
