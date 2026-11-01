import { CSSProperties } from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";
import { useSelectionIndicator } from "../selectionIndicator/useSelectionIndicator";

export interface SegmentedOption {
  value: string;
  label: string;
  icon?: MaterialSymbol;
}

/** Connected track of 2-5 options; the selected segment fills with secondary-container. */
export interface SegmentedButtonProps {
  options: SegmentedOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiselect?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ITEM_BASE =
  "fx-reset fx-state relative inline-flex items-center justify-center gap-2 px-3 min-w-12 border-s border-s-(--color-outline) first-of-type:border-s-0 cursor-pointer transition-colors";

const ITEM_STATE_CLASSES = {
  on: "bg-(--color-secondary-container) text-(--color-on-secondary-container)",
  onIndicator: "bg-transparent text-(--color-on-secondary-container)",
  off: "bg-transparent text-(--color-on-surface)",
};

const INDICATOR_SLIDE_CLASSES =
  "[transition:transform_var(--motion-spring-stiff),width_var(--motion-spring-stiff),height_var(--motion-spring-stiff)] motion-reduce:transition-none";

/** Two to five mutually exclusive (or multi-select) options in one connected track. */
export function SegmentedButton({
  options = [],
  value,
  onChange,
  multiselect = false,
  className = "",
  style,
  ...rest
}: SegmentedButtonProps) {
  const values: string[] = multiselect
    ? Array.isArray(value)
      ? value
      : []
    : value !== undefined
      ? [value as string]
      : [];
  function toggle(v: string) {
    if (!onChange) return;
    if (!multiselect) return onChange(v);
    onChange(
      values.includes(v) ? values.filter((x) => x !== v) : [...values, v],
    );
  }
  const { containerRef, indicatorStyle, indicatorClassName } =
    useSelectionIndicator<HTMLDivElement>(
      multiselect ? undefined : (value as string | undefined),
      INDICATOR_SLIDE_CLASSES,
    );
  return (
    <div
      ref={containerRef}
      className={`relative inline-flex h-10 rounded-(--shape-corner-full) overflow-hidden border border-(--color-outline) ${className}`}
      role="group"
      style={style}
      {...rest}
    >
      {!multiselect && indicatorStyle ? (
        <span
          aria-hidden="true"
          className={[
            "bg-(--color-secondary-container)",
            indicatorClassName,
          ].join(" ")}
          style={indicatorStyle}
        />
      ) : null}
      {options.map((o) => {
        const on = values.includes(o.value);
        return (
          <button
            key={o.value}
            className={`${ITEM_BASE} ${on ? (multiselect ? ITEM_STATE_CLASSES.on : ITEM_STATE_CLASSES.onIndicator) : ITEM_STATE_CLASSES.off}`}
            data-indicator-target={(!multiselect && on) || undefined}
            aria-pressed={on}
            onClick={() => toggle(o.value)}
            type="button"
          >
            {on ? (
              <Icon name="check" size={18} />
            ) : o.icon ? (
              <Icon name={o.icon} size={18} />
            ) : null}
            <Text as="span" variant="label-large">
              {o.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
}
