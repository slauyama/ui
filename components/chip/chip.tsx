import { MouseEvent } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

/**
 * Assist, filter, input or suggestion chip. 32px tall, corner-small.
 */
export interface ChipProps {
  variant?: "assist" | "filter" | "input" | "suggestion";
  label: string;
  /** Leading ligature. A filter chip swaps it for a check when selected. */
  icon?: string;
  /** Image URL for input chips that represent a person. */
  avatar?: string;
  selected?: boolean;
  elevated?: boolean;
  onClick?: (e: MouseEvent) => void;
  /** Supplying this renders the trailing remove affordance. */
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

function chipStateClasses(selected: boolean, elevated: boolean): string {
  const border =
    selected || elevated
      ? "border-transparent"
      : "border-(--color-outline-variant)";
  const text = selected
    ? "text-(--color-on-secondary-container)"
    : "text-(--color-on-surface-variant)";
  const bgAndShadow = elevated
    ? "bg-(--color-surface-container-low) shadow-(--elevation-level1) hover:shadow-(--elevation-level2)"
    : selected
      ? "bg-(--color-secondary-container)"
      : "bg-transparent";
  return `${border} ${text} ${bgAndShadow}`;
}

export function Chip({
  variant = "assist",
  label,
  icon,
  avatar,
  selected,
  elevated = false,
  onClick,
  onRemove,
  disabled = false,
  className = "",
  ...rest
}: ChipProps) {
  const isFilter = variant === "filter";
  const showCheck = isFilter && selected;
  const hasLeading = !!(icon || avatar || showCheck);
  const hasTrailing = !!onRemove;
  const iconColor = selected
    ? "var(--color-on-secondary-container)"
    : "var(--color-primary)";
  return (
    <button
      type="button"
      className={[
        "fx-reset fx-state relative inline-flex items-center gap-2 h-8 border cursor-pointer whitespace-nowrap transition",
        variant === "input"
          ? "rounded-(--shape-corner-small)"
          : "rounded-(--shape-chip)",
        hasLeading ? "ps-2" : "ps-4",
        hasTrailing ? "pe-2" : "pe-4",
        chipStateClasses(!!selected, elevated),
        "disabled:opacity-[0.38] disabled:pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-selected={selected ? "true" : "false"}
      data-elevated={elevated ? "true" : "false"}
      data-has-leading={hasLeading ? "true" : "false"}
      data-has-trailing={hasTrailing ? "true" : "false"}
      aria-pressed={isFilter ? !!selected : undefined}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {avatar ? (
        <img
          className="w-6 h-6 rounded-full object-cover -ms-2"
          src={avatar}
          alt=""
        />
      ) : null}
      {showCheck ? (
        <Icon name="check" size={18} color={iconColor} />
      ) : icon ? (
        <Icon name={icon} size={18} color={iconColor} />
      ) : null}
      <Text as="span" variant="label-large">
        {label}
      </Text>
      {onRemove ? (
        <span
          // Full-contrast at rest: an idle opacity fade here dims the icon below the 4.5:1
          // minimum against a light surface. The chip's own fx-state wash already covers hover.
          className="inline-flex items-center justify-center w-4.5 h-4.5 border-none bg-transparent text-inherit cursor-pointer p-0 rounded-full"
          role="button"
          aria-label={"Remove " + label}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Icon name="close" size={18} />
        </span>
      ) : null}
    </button>
  );
}
