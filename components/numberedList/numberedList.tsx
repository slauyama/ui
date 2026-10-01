import { LiHTMLAttributes, OlHTMLAttributes } from "react";
import { TEXT_VARIANT_CLASSES } from "../text/text";

export type NumberedListProps = OlHTMLAttributes<HTMLOListElement>;

export type NumberedListItemProps = LiHTMLAttributes<HTMLLIElement>;

function NumberedListRoot({
  children,
  className = "",
  ...rest
}: NumberedListProps) {
  return (
    <ol
      className={`flex flex-col gap-2 m-0 ps-9 list-decimal tabular-nums marker:text-(--color-on-surface-variant) ${className}`}
      {...rest}
    >
      {children}
    </ol>
  );
}

function NumberedListItem({
  children,
  className = "",
  ...rest
}: NumberedListItemProps) {
  return (
    <li
      className={`${TEXT_VARIANT_CLASSES["body-large"]} ps-1 text-(--color-on-surface) ${className}`}
      {...rest}
    >
      {children}
    </li>
  );
}

export const NumberedList = Object.assign(NumberedListRoot, {
  Item: NumberedListItem,
});
