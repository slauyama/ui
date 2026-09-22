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

/** Bottom bar for compact widths: 3-5 destinations */
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
            className="fx-reset flex flex-col items-center gap-1 flex-1 border-none bg-transparent cursor-pointer p-0"
            aria-current={on ? "page" : undefined}
            onClick={() => onChange && onChange(it.value)}
          >
            {/*
              Icon and label share one pill, not just the icon: a separate,
              narrower pill around only the icon left the label looking
              unselected next to a "selected" glyph.
            */}
            <span
              className={[
                "fx-state relative flex flex-col items-center gap-0.5 rounded-2xl px-4 py-1 transition-colors",
                on
                  ? "bg-(--color-secondary-container) text-(--color-on-secondary-container)"
                  : "text-(--color-on-surface-variant)",
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
              <Text as="span" variant="label-medium">
                {it.label}
              </Text>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
