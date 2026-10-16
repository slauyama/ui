import { MouseEvent, CSSProperties } from "react";
import type { MaterialSymbol } from "material-symbols";
import { Icon } from "../icon/icon";

type IconButtonSizes = "small" | "medium";
type AnchorTarget = "_blank" | "_self" | "_parent" | "_top";

interface IconButtonSharedProps {
  icon: MaterialSymbol;
  variant?: "standard" | "filled" | "tonal" | "outlined";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  label: string;
  size?: IconButtonSizes;
  /** Force the fill axis; defaults to following selected. */
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface IconButtonAsButton extends IconButtonSharedProps {
  href?: undefined;
  target?: undefined;
  type?: "button" | "submit" | "reset";
  /** Glyph swapped in when selected, e.g. favorite over favorite_border. */
  selectedIcon?: MaterialSymbol;
  selected?: boolean;
}

interface IconButtonAsAnchor extends IconButtonSharedProps {
  href: string;
  target?: AnchorTarget;
  type?: undefined;
  selectedIcon?: undefined;
  selected?: undefined;
}

export type IconButtonProps = IconButtonAsButton | IconButtonAsAnchor;

const SIZE_CLASSES: Record<IconButtonSizes, string> = {
  small: "w-8 h-8",
  medium: "w-10 h-10",
};

function variantClasses(
  variant: "standard" | "filled" | "tonal" | "outlined",
  isToggle: boolean,
  selected: boolean,
): string {
  switch (variant) {
    case "filled":
      return isToggle && !selected
        ? "border-none bg-(--color-surface-container-highest) text-(--color-primary) disabled:bg-(--color-on-surface)/12"
        : "border-none bg-(--color-primary) text-(--color-on-primary) disabled:bg-(--color-on-surface)/12";
    case "tonal":
      return "border-none bg-(--color-secondary-container) text-(--color-on-secondary-container) disabled:bg-(--color-on-surface)/12";
    case "outlined":
      return isToggle && selected
        ? "border border-transparent bg-(--color-inverse-surface) text-(--color-inverse-on-surface)"
        : "border border-(--color-outline-variant) bg-transparent text-(--color-on-surface-variant)";
    case "standard":
    default:
      return isToggle && selected
        ? "border-none bg-transparent text-(--color-primary)"
        : "border-none bg-transparent text-(--color-on-surface-variant)";
  }
}

/** 40x40 icon-only control, optionally a toggle. */
export function IconButton({
  icon,
  selectedIcon,
  variant = "standard",
  selected,
  onClick,
  disabled = false,
  href,
  target,
  type = "button",
  label,
  size = "medium",
  filled,
  className = "",
  style,
  ...rest
}: IconButtonProps) {
  const Tag = href && !disabled ? "a" : "button";
  const isToggle = selected !== undefined;
  const glyph = isToggle && selected && selectedIcon ? selectedIcon : icon;
  return (
    <Tag
      className={[
        "fx-reset fx-state relative inline-flex items-center justify-center p-0 rounded-(--shape-corner-full) cursor-pointer no-underline transition-colors [-webkit-tap-highlight-color:transparent]",
        "disabled:cursor-default disabled:text-(--color-on-surface)/38",
        SIZE_CLASSES[size],
        variantClasses(variant, isToggle, !!selected),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-size={size}
      data-selected={isToggle ? String(!!selected) : undefined}
      aria-pressed={isToggle ? !!selected : undefined}
      aria-label={label}
      href={Tag === "a" ? href : undefined}
      target={Tag === "a" ? target : undefined}
      rel={Tag === "a" && target ? "noopener noreferrer" : undefined}
      type={Tag === "button" ? type : undefined}
      disabled={Tag === "button" ? disabled : undefined}
      aria-disabled={disabled ? "true" : undefined}
      onClick={disabled ? undefined : onClick}
      style={style}
      {...rest}
    >
      <Icon
        name={glyph}
        size={size === "small" ? 20 : 24}
        filled={filled !== undefined ? filled : !!selected}
      />
    </Tag>
  );
}
