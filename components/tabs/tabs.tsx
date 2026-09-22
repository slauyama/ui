import { CSSProperties, HTMLAttributes } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

export interface TabDef {
  value: string;
  label: string;
  icon?: string;
}

/**
 * Primary tabs (3px pill indicator) or secondary tabs (2px full-width rule).
 */
export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  tabs: TabDef[];
  value?: string;
  onChange?: (value: string) => void;
  /** primary for top-level content, secondary for content within a tab. */
  variant?: "primary" | "secondary";
  className?: string;
  style?: CSSProperties;
}

/** Primary (3px pill indicator) or secondary (2px full-width) tabs. */
export function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "primary",
  className = "",
  style,
  ...rest
}: TabsProps) {
  return (
    <div
      className={[
        "flex items-stretch gap-0 bg-(--color-surface) shadow-[inset_0_-1px_0_0_var(--color-surface-container-highest)] overflow-x-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="tablist"
      style={style}
      {...rest}
    >
      {tabs.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={on}
            className={[
              "fx-reset fx-state relative inline-flex flex-1 items-center justify-center gap-2 min-w-20 h-12 px-4 border-none bg-transparent cursor-pointer whitespace-nowrap transition-colors",
              on
                ? variant === "secondary"
                  ? "text-(--color-on-surface)"
                  : "text-(--color-primary)"
                : "text-(--color-on-surface-variant)",
            ].join(" ")}
            onClick={() => onChange && onChange(t.value)}
          >
            {t.icon ? <Icon name={t.icon} size={24} filled={on} /> : null}
            <Text as="span" variant="title-small">
              {t.label}
            </Text>
            {on ? (
              <span
                className={
                  variant === "secondary"
                    ? "absolute bottom-0 left-0 right-0 h-0.5 w-full bg-(--color-primary)"
                    : "absolute bottom-0 left-0 right-0 mx-auto h-1 w-3/5 max-w-30 rounded-t-[3px] bg-(--color-primary)"
                }
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
