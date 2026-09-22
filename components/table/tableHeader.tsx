import { HTMLAttributes } from "react";

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

/** The `<thead>`; holds a Table.Row of Table.Head cells. */
export function TableHeader({
  children,
  className = "",
  ...rest
}: TableHeaderProps) {
  return (
    <thead className={className} {...rest}>
      {children}
    </thead>
  );
}
