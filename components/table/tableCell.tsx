import { HTMLAttributes } from "react";
import { Text, TextAlign } from "../text/text";

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  align?: TextAlign;
}

/** A body cell. */
export function TableCell({
  align,
  children,
  className = "",
  ...rest
}: TableCellProps) {
  return (
    <Text
      as="td"
      variant="body-medium"
      align={align}
      className={`px-4 py-3 ${className}`}
      {...rest}
    >
      {children}
    </Text>
  );
}
