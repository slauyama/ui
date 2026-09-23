import { ButtonHTMLAttributes, ReactNode } from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

/** One 48px menu row. */
export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  /** Leading Material Symbols ligature. */
  leading?: MaterialSymbol;
  /** Trailing text such as a keyboard shortcut. */
  trailing?: ReactNode;
  selected?: boolean;
}

/** One menu row, 48px tall. */
export function MenuItem({
  label,
  leading,
  trailing,
  selected = false,
  disabled = false,
  onClick,
  className = "",
  style,
  ...rest
}: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={[
        "fx-reset fx-state relative flex items-center gap-3 w-full min-h-12 px-3 py-2 border-none cursor-pointer text-start",
        selected
          ? "bg-(--color-secondary-container) text-(--color-on-secondary-container)"
          : "bg-transparent text-(--color-on-surface)",
        "disabled:opacity-[0.38] disabled:pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-selected={selected ? "true" : "false"}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {leading ? (
        <Icon name={leading} color="var(--color-on-surface-variant)" />
      ) : null}
      <Text as="span" variant="body-large">
        {label}
      </Text>
      {trailing ? (
        <Text
          as="span"
          variant="body-medium"
          className="ms-auto text-(--color-on-surface-variant)"
        >
          {trailing}
        </Text>
      ) : null}
    </button>
  );
}
