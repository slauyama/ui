import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";
import { useSelectionIndicator } from "../selectionIndicator/useSelectionIndicator";
import type { NavItem } from "../navigationBar/navigationBar";

export type { NavItem };

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

/** Vertical rail for medium widths, with an optional FAB at the top. */
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
  const { containerRef, indicatorStyle, indicatorClassName } =
    useSelectionIndicator<HTMLElement>(value);
  return (
    <nav
      ref={containerRef}
      className={[
        "relative flex flex-col items-center gap-3 w-20 pt-11 px-0 pb-4 h-full bg-(--color-surface)",
        align === "center" ? "justify-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {indicatorStyle ? (
        <span
          aria-hidden="true"
          className={[
            "rounded-2xl bg-(--color-secondary-container)",
            indicatorClassName,
          ].join(" ")}
          style={indicatorStyle}
        />
      ) : null}
      {top ? <div style={{ marginBottom: 16 }}>{top}</div> : null}
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            className="fx-reset flex flex-col items-center gap-1 border-none bg-transparent cursor-pointer p-0 w-full"
            aria-current={on ? "page" : undefined}
            onClick={() => onChange && onChange(it.value)}
          >
            <span
              data-indicator-target={on || undefined}
              className={[
                "fx-state relative flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1 transition-colors",
                on
                  ? "text-(--color-on-secondary-container)"
                  : "text-(--color-on-surface-variant)",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Icon name={it.icon} size={24} filled={on} />
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
