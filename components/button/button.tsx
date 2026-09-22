import { MouseEvent, ReactNode, CSSProperties } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

type Variant = "filled" | "tonal" | "elevated" | "outlined" | "text";

export interface ButtonProps {
  /** Emphasis. filled = the one primary action on screen. Default "filled". */
  variant?: Variant;
  icon?: string;
  trailingIcon?: string;
  children?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  filled:
    "border-transparent bg-(--color-primary) text-(--color-on-primary) hover:shadow-(--elevation-level1) disabled:bg-(--color-on-surface)/12",
  tonal:
    "border-transparent bg-(--color-secondary-container) text-(--color-on-secondary-container) hover:shadow-(--elevation-level1) disabled:bg-(--color-on-surface)/12",
  elevated:
    "border-transparent bg-(--color-surface-container-low) text-(--color-primary) shadow-(--elevation-level1) hover:shadow-(--elevation-level2) disabled:bg-(--color-on-surface)/12",
  outlined:
    "bg-transparent text-(--color-primary) border-(--color-outline-variant) active:border-(--color-outline) disabled:border-(--color-on-surface)/12",
  text: "border-transparent bg-transparent text-(--color-primary)",
};

/** The five Material button variants, one component. */
export function Button({
  variant = "filled",
  icon,
  trailingIcon,
  children,
  disabled = false,
  href,
  onClick,
  type = "button",
  fullWidth = false,
  className = "",
  style,
  ...rest
}: ButtonProps) {
  const Tag = href && !disabled ? "a" : "button";
  const isText = variant === "text";
  const startPad = isText ? "ps-3" : icon ? "ps-4" : "ps-6";
  const endPad = isText
    ? trailingIcon
      ? "pe-4"
      : "pe-3"
    : trailingIcon
      ? "pe-4"
      : "pe-6";

  return (
    <Tag
      className={[
        "fx-reset fx-state relative inline-flex items-center justify-center gap-2 h-10 border rounded-(--shape-button) cursor-pointer whitespace-nowrap no-underline transition-shadow [-webkit-tap-highlight-color:transparent]",
        isText ? "min-w-12" : "min-w-16",
        startPad,
        endPad,
        fullWidth ? "w-full" : "",
        VARIANT_CLASSES[variant],
        disabled
          ? "cursor-default shadow-none! text-(--color-on-surface)/38"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      href={Tag === "a" ? href : undefined}
      type={Tag === "button" ? type : undefined}
      disabled={Tag === "button" ? disabled : undefined}
      aria-disabled={disabled ? "true" : undefined}
      onClick={disabled ? undefined : onClick}
      style={style}
      {...rest}
    >
      {icon ? <Icon name={icon} size={18} weight={500} /> : null}
      <Text as="span" variant="label-large">
        {children}
      </Text>
      {trailingIcon ? (
        <Icon name={trailingIcon} size={18} weight={500} />
      ) : null}
    </Tag>
  );
}
