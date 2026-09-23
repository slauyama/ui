import { HTMLAttributes } from "react";
import { ListItem } from "./listItem";

export type ListProps = HTMLAttributes<HTMLDivElement>;

function ListRoot({ children, className = "", style, ...rest }: ListProps) {
  return (
    <div
      className={`flex flex-col py-2 m-0 list-none bg-transparent rounded-[inherit] ${className}`}
      role="group"
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export const List = Object.assign(ListRoot, { Item: ListItem });
