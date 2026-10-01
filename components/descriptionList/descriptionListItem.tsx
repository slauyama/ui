import { HTMLAttributes, ReactNode, useContext } from "react";
import { TEXT_VARIANT_CLASSES } from "../text/text";
import { DescriptionListContext } from "./descriptionListContext";

export interface DescriptionListItemProps extends HTMLAttributes<HTMLDivElement> {
  term: ReactNode;
  children: ReactNode;
}

/** In two columns the last row may hold two items, so both drop their divider. */
const DIVIDER_CLASSES: Record<1 | 2, string> = {
  1: "border-b border-(--color-outline-variant) last:border-b-0",
  2: "border-b border-(--color-outline-variant) last:border-b-0 [&:nth-last-child(2):nth-child(odd)]:border-b-0",
};

/** One term/description pair: a `<dt>` and `<dd>` in the same type role. */
export function DescriptionListItem({
  term,
  children,
  className = "",
  style,
  ...rest
}: DescriptionListItemProps) {
  const { columns, dividers } = useContext(DescriptionListContext);
  return (
    <div
      className={[
        "p-2 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-4 items-baseline",
        dividers ? DIVIDER_CLASSES[columns] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      <dt
        className={`${TEXT_VARIANT_CLASSES["body-large"]} text-(--color-on-surface-variant)`}
      >
        {term}
      </dt>
      <dd
        className={`${TEXT_VARIANT_CLASSES["body-large"]} m-0 min-w-0 text-(--color-on-surface)`}
      >
        {children}
      </dd>
    </div>
  );
}
