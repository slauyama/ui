import { CSSProperties, HTMLAttributes, KeyboardEvent, useRef } from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";
import { useSelectionIndicator } from "../selectionIndicator/useSelectionIndicator";

export interface TabDef {
  value: string;
  label: string;
  icon?: MaterialSymbol;
}

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  tabs: TabDef[];
  value?: string;
  onChange?: (value: string) => void;
  /** primary for top-level content, secondary for content within a tab. */
  variant?: "primary" | "secondary";
  /** When set, each tab gets id `{id}-{value}` and aria-controls `{id}-{value}-panel`; give your panel that id. */
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const NEXT_INDEX: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/** Primary (3px pill indicator) or secondary (2px full-width) tabs. */
export function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "primary",
  id,
  className = "",
  style,
  ...rest
}: TabsProps) {
  const { containerRef, indicatorStyle, indicatorClassName } =
    useSelectionIndicator<HTMLDivElement>(value);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = tabs.findIndex((t) => t.value === value);

  function moveSelection(e: KeyboardEvent, index: number) {
    const next = NEXT_INDEX[e.key]?.(index, tabs.length);
    if (next === undefined) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    onChange?.(tabs[next].value);
  }

  return (
    <div
      ref={containerRef}
      className={[
        "relative flex items-stretch gap-0 bg-(--color-surface) shadow-[inset_0_-1px_0_0_var(--color-surface-container-highest)] overflow-x-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="tablist"
      id={id}
      style={style}
      {...rest}
    >
      {tabs.map((t, i) => {
        const on = t.value === value;
        const tabbable = on || (selectedIndex === -1 && i === 0);
        return (
          <button
            key={t.value}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={id ? `${id}-${t.value}` : undefined}
            aria-controls={id ? `${id}-${t.value}-panel` : undefined}
            aria-selected={on}
            tabIndex={tabbable ? 0 : -1}
            onKeyDown={(e) => moveSelection(e, i)}
            data-indicator-target={on || undefined}
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
          </button>
        );
      })}
      {indicatorStyle ? (
        <span
          aria-hidden="true"
          className={["flex items-end justify-center", indicatorClassName].join(
            " ",
          )}
          style={indicatorStyle}
        >
          <span
            className={
              variant === "secondary"
                ? "h-0.5 w-full bg-(--color-primary)"
                : "h-1 w-3/5 max-w-30 rounded-t-[3px] bg-(--color-primary)"
            }
          />
        </span>
      ) : null}
    </div>
  );
}
