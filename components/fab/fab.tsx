import { MouseEvent, CSSProperties } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

/** Floating action button. One per screen, for the screen's defining action. */
export interface FabProps {
  icon: string;
  /** Supplying a label makes it an extended FAB, 56px tall with auto width. */
  label?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary" | "surface";
  /** Level-1 shadow instead of level-3, for FABs inside a card or sheet. */
  lowered?: boolean;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
}

const SIZE_CLASSES: Record<"small" | "medium" | "large", string> = {
  small: "w-10 h-10 rounded-(--shape-corner-medium)",
  medium: "w-14 h-14 rounded-(--shape-fab)",
  large: "w-24 h-24 rounded-(--shape-corner-extra-large)",
};

const COLOR_BG_CLASSES: Record<
  "primary" | "secondary" | "tertiary" | "surface",
  string
> = {
  primary: "bg-(--color-primary-container)",
  secondary: "bg-(--color-secondary-container)",
  tertiary: "bg-(--color-tertiary-container)",
  surface: "bg-(--color-surface-container-high)",
};

const COLOR_TEXT_CLASSES: Record<
  "primary" | "secondary" | "tertiary" | "surface",
  string
> = {
  primary: "text-(--color-on-primary-container)",
  secondary: "text-(--color-on-secondary-container)",
  tertiary: "text-(--color-on-tertiary-container)",
  surface: "text-(--color-primary)",
};

/** Floating action button: the single most important action on a screen. */
export function Fab({
  icon,
  label,
  size = "medium",
  color = "primary",
  lowered = false,
  onClick,
  className = "",
  style,
  ...rest
}: FabProps) {
  const extended = !!label;
  return (
    <button
      className={[
        "fx-reset fx-state relative inline-flex items-center justify-center gap-3 border-none cursor-pointer transition active:scale-[0.96] [-webkit-tap-highlight-color:transparent]",
        SIZE_CLASSES[size],
        extended ? "w-auto! h-14! px-5 rounded-(--shape-fab)!" : "",
        COLOR_TEXT_CLASSES[color],
        lowered
          ? "shadow-(--elevation-level1) bg-(--color-surface-container-low)"
          : `${COLOR_BG_CLASSES[color]} shadow-(--elevation-fab) hover:shadow-(--elevation-fab-hover)`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-size={size}
      data-color={color}
      data-extended={extended ? "true" : "false"}
      data-lowered={lowered ? "true" : "false"}
      onClick={onClick}
      aria-label={extended ? undefined : icon}
      style={style}
      {...rest}
    >
      <Icon name={icon} size={size === "large" ? 36 : 24} />
      {extended ? (
        <Text as="span" variant="label-large">
          {label}
        </Text>
      ) : null}
    </button>
  );
}
