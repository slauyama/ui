import { Children, Fragment, HTMLAttributes } from "react";
import { Divider } from "../divider/divider";
import { ListItem } from "./listItem";

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
}

function ListRoot({
  children,
  dividers = false,
  className = "",
  style,
  ...rest
}: ListProps) {
  const items = dividers ? Children.toArray(children) : null;
  return (
    <div
      className={`flex flex-col py-2 m-0 list-none bg-transparent rounded-[inherit] ${className}`}
      role="group"
      style={style}
      {...rest}
    >
      {items
        ? items.map((child, i) => (
            <Fragment key={i}>
              {child}
              {i < items.length - 1 ? <Divider /> : null}
            </Fragment>
          ))
        : children}
    </div>
  );
}

export const List = Object.assign(ListRoot, { Item: ListItem });
