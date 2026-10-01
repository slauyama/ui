import {
  createContext,
  HTMLAttributes,
  LiHTMLAttributes,
  useContext,
} from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { TEXT_VARIANT_CLASSES } from "../text/text";

export interface IconListProps extends HTMLAttributes<HTMLUListElement> {
  /** Icon shown on every item that doesn't set its own. */
  icon?: MaterialSymbol;
}

export interface IconListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: MaterialSymbol;
}

const IconListContext = createContext<MaterialSymbol>("check");

function IconListRoot({
  icon = "check",
  children,
  className = "",
  ...rest
}: IconListProps) {
  return (
    <IconListContext.Provider value={icon}>
      <ul
        className={`flex flex-col gap-2 m-0 p-0 list-none ${className}`}
        {...rest}
      >
        {children}
      </ul>
    </IconListContext.Provider>
  );
}

function IconListItem({
  icon,
  children,
  className = "",
  ...rest
}: IconListItemProps) {
  const listIcon = useContext(IconListContext);
  return (
    <li
      className={`${TEXT_VARIANT_CLASSES["body-large"]} flex gap-3 text-(--color-on-surface) ${className}`}
      {...rest}
    >
      <span className="flex items-center flex-none h-(--typescale-body-large-line-height) text-(--color-primary)">
        <Icon name={icon ?? listIcon} size={20} />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export const IconList = Object.assign(IconListRoot, { Item: IconListItem });
