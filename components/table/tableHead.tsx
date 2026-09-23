import { ThHTMLAttributes } from "react";
import { Icon } from "../icon/icon";
import { Text, TextAlign } from "../text/text";

export type SortDirection = "asc" | "desc";

/** A column header cell. Pass onSort to make it a sort button. */
export interface TableHeadProps extends Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "scope"
> {
  align?: TextAlign;
  /** Which way this column is sorted, if it is the sorted column. */
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

/** A column header cell, with an optional sort button. */
export function TableHead({
  align = "left",
  sortDirection,
  onSort,
  children,
  className = "",
  ...rest
}: TableHeadProps) {
  const content = (
    <>
      {children}
      {sortDirection ? (
        <Icon
          name="arrow_upward"
          size={16}
          className={`transition-transform duration-(--motion-duration-short4) ease-(--motion-easing-standard) motion-reduce:transition-none ${sortDirection === "desc" ? "rotate-180" : ""}`}
        />
      ) : null}
    </>
  );

  return (
    <Text
      as="th"
      variant="label-large"
      align={align}
      scope="col"
      color="var(--color-on-surface-variant)"
      className={`px-4 py-3 ${className}`}
      aria-sort={sortDirection ? ARIA_SORT[sortDirection] : undefined}
      {...rest}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className="fx-reset inline-flex items-center gap-1 p-0 border-none bg-transparent text-inherit cursor-pointer select-none [font:inherit] tracking-[inherit]"
        >
          {content}
        </button>
      ) : (
        content
      )}
    </Text>
  );
}
