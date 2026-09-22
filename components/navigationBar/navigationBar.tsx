import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Icon } from "../icon/icon";
import { Badge } from "../badge/badge";
import { Text } from "../text/text";

export interface NavItem {
  value: string;
  label: string;
  icon: string;
  badge?: ReactNode;
}

/**
 * Bottom navigation for compact widths: 3-5 destinations, 80px tall.
 */
export interface NavigationBarProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  items: NavItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

/** Bottom bar for compact widths: 3-5 destinations, 80px tall. */
export function NavigationBar({
  items = [],
  value,
  onChange,
  className = "",
  style,
  ...rest
}: NavigationBarProps) {
  return (
    <nav
      className={[
        "flex items-center justify-around h-20 pt-3 px-2 pb-4 gap-2 bg-(--color-surface-container)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            className={[
              "fx-reset flex flex-col items-center gap-1 flex-1 border-none bg-transparent cursor-pointer p-0",
              on
                ? "text-(--color-on-surface)"
                : "text-(--color-on-surface-variant)",
            ].join(" ")}
            aria-current={on ? "page" : undefined}
            onClick={() => onChange && onChange(it.value)}
          >
            <span
              className={[
                "fx-state relative flex items-center justify-center w-16 h-8 rounded-full transition-colors",
                on
                  ? "bg-(--color-secondary-container) text-(--color-on-secondary-container)"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {it.badge ? (
                <Badge value={it.badge}>
                  <Icon name={it.icon} size={24} filled={on} />
                </Badge>
              ) : (
                <Icon name={it.icon} size={24} filled={on} />
              )}
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
