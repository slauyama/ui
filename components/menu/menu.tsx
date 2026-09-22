import { HTMLAttributes } from "react";
import { MenuItem } from "./menuItem";

/** Elevated surface holding Menu.Item rows. Renders in flow; position it yourself. */
export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

function MenuRoot({
  open = true,
  children,
  className = "",
  style,
  ...rest
}: MenuProps) {
  if (!open) return null;
  return (
    <div
      className={`min-w-28 max-w-70 py-2 rounded-(--shape-menu) bg-(--color-surface-container) shadow-(--elevation-menu) overflow-auto animate-[menu-in_300ms_var(--motion-easing-emphasized-decelerate)] ${className}`}
      role="menu"
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Surface for menu rows: `<Menu><Menu.Item label="Copy" /></Menu>`. Position it yourself; it renders in flow. */
export const Menu = Object.assign(MenuRoot, { Item: MenuItem });
