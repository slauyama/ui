import { HTMLAttributes } from "react";

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

/** The `<tbody>`; holds Table.Row elements of Table.Cell cells. */
export function TableBody({
  children,
  className = "",
  ...rest
}: TableBodyProps) {
  return (
    <tbody className={className} {...rest}>
      {children}
    </tbody>
  );
}
