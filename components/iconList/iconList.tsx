import {
  createContext,
  HTMLAttributes,
  LiHTMLAttributes,
  useContext,
} from "react";
import { Icon, IconProps } from "../icon/icon";
import { TEXT_VARIANT_CLASSES } from "../text/text";

export interface IconListProps extends HTMLAttributes<HTMLUListElement> {
  iconProps?: IconProps;
}

export interface IconListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  iconProps?: IconProps;
}

const IconListContext = createContext<IconProps>({
  name: "circle",
  filled: true,
  size: 10,
});

function IconListRoot({
  iconProps = {
    name: "circle",
    filled: true,
    size: 10,
  },
  children,
  className = "",
  ...rest
}: IconListProps) {
  return (
    <IconListContext.Provider value={iconProps}>
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
  iconProps,
  children,
  className = "",
  ...rest
}: IconListItemProps) {
  const listIconProps = useContext(IconListContext);
  return (
    <li
      className={`${TEXT_VARIANT_CLASSES["body-large"]} flex gap-3 text-(--color-on-surface) ${className}`}
      {...rest}
    >
      <span className="flex items-center flex-none h-(--typescale-body-large-line-height)">
        <Icon
          name={iconProps?.name ?? listIconProps.name}
          size={iconProps?.size ?? listIconProps.size}
          color={iconProps?.color ?? listIconProps.color}
          filled={iconProps?.filled ?? listIconProps.filled}
        />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export const IconList = Object.assign(IconListRoot, { Item: IconListItem });
