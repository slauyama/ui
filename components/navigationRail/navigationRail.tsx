import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";
import type { NavItem } from "../navigationBar/navigationBar";

export type { NavItem };

/** 80px vertical rail for medium widths, with an optional FAB slot at the top. */
export interface NavigationRailProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  items: NavItem[];
  value?: string;
  onChange?: (value: string) => void;
  /** Usually a Fab. */
  top?: ReactNode;
  align?: "start" | "center";
  className?: string;
  style?: CSSProperties;
}

/** 80px vertical rail for medium widths, with an optional FAB at the top. */
export function NavigationRail({
  items = [],
  value,
  onChange,
  top,
  align = "start",
  className = "",
  style,
  ...rest
}: NavigationRailProps) {
  return (
    <nav
      className={[
        "flex flex-col items-center gap-3 w-20 pt-11 px-0 pb-4 h-full bg-(--color-surface)",
        align === "center" ? "justify-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {top ? <div style={{ marginBottom: 16 }}>{top}</div> : null}
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            className={[
              "fx-reset flex flex-col items-center gap-1 border-none bg-transparent cursor-pointer p-0 w-full",
              on
                ? "text-(--color-on-surface)"
                : "text-(--color-on-surface-variant)",
            ].join(" ")}
            aria-current={on ? "page" : undefined}
            onClick={() => onChange && onChange(it.value)}
          >
            <span
              className={[
                "fx-state relative flex items-center justify-center w-14 h-8 rounded-full transition-colors",
                on
                  ? "bg-(--color-secondary-container) text-(--color-on-secondary-container)"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Icon name={it.icon} size={24} filled={on} />
            </span>
            <Text as="span" variant="label-medium">
              {it.label}
            </Text>
          </button>
        );
      })}
    </nav>
  );
}
