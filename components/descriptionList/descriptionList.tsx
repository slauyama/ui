import { HTMLAttributes } from "react";
import { DescriptionListContext } from "./descriptionListContext";
import { DescriptionListItem } from "./descriptionListItem";

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  /** Number of term/description pairs per row. */
  columns?: 1 | 2;
  dividers?: boolean;
}

const COLUMNS_CLASSES: Record<1 | 2, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2 gap-x-6",
};

function DescriptionListRoot({
  children,
  columns = 1,
  dividers = false,
  className = "",
  style,
  ...rest
}: DescriptionListProps) {
  return (
    <DescriptionListContext.Provider value={{ columns, dividers }}>
      <dl
        className={`grid ${COLUMNS_CLASSES[columns]} py-1 m-0 bg-transparent rounded-[inherit] ${className}`}
        data-columns={String(columns)}
        style={style}
        {...rest}
      >
        {children}
      </dl>
    </DescriptionListContext.Provider>
  );
}

export const DescriptionList = Object.assign(DescriptionListRoot, {
  Item: DescriptionListItem,
});
