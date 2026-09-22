import { HTMLAttributes } from "react";
import { ListItem } from "./listItem";

/** Vertical container for List.Item rows. */
export type ListProps = HTMLAttributes<HTMLDivElement>;

function ListRoot({ children, className = "", style, ...rest }: ListProps) {
  return (
    <div
      className={`flex flex-col py-2 m-0 list-none bg-(--color-surface) rounded-[inherit] ${className}`}
      // role="group", not "list": "list" requires only listitem children, but rows are commonly
      // interspersed with Divider (an hr) or other content (e.g. a LinearProgress under a row),
      // and an interactive row is a button/link, not a valid listitem (see ListItem).
      role="group"
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Vertical container for list rows: `<List><List.Item headline="Inbox" /></List>`, 8px block padding. */
export const List = Object.assign(ListRoot, { Item: ListItem });
