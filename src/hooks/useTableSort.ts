import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

function defaultCompareValues(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return String(a).localeCompare(String(b));
}

interface UseSortOptions<T> {
  initialDirection?: SortDirection;
  comparator?: (a: T, b: T, field: keyof T) => number;
}

export function useTableSort<T extends object>(
  items: T[],
  initialField: keyof T,
  { initialDirection = "asc", comparator }: UseSortOptions<T> = {},
) {
  const [sortField, setSortField] = useState(initialField);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialDirection);

  const toggleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTableRows = useMemo(() => {
    const compare =
      comparator ??
      ((a: T, b: T) => defaultCompareValues(a[sortField], b[sortField]));
    const sorted = [...items].sort((a, b) => compare(a, b, sortField));
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [items, sortField, sortDirection, comparator]);

  return { sortedTableRows, sortField, sortDirection, toggleSort };
}
