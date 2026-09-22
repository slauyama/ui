import { HTMLAttributes } from "react";

/** Elevated, filled or outlined container with a 12px corner. */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "filled" | "outlined";
  interactive?: boolean;
}

function cardVariantClasses(
  variant: "elevated" | "filled" | "outlined",
  interactive: boolean,
): string {
  switch (variant) {
    case "filled":
      return "bg-(--color-surface-container-highest) shadow-none";
    case "outlined":
      return [
        "bg-(--color-surface) shadow-none border border-(--color-outline-variant)",
        interactive ? "hover:shadow-(--elevation-level1)" : "",
      ]
        .filter(Boolean)
        .join(" ");
    case "elevated":
    default:
      return [
        "bg-(--color-surface-container-low) shadow-(--elevation-card)",
        interactive ? "hover:shadow-(--elevation-card-hover)" : "",
      ]
        .filter(Boolean)
        .join(" ");
  }
}

/** Elevated, filled or outlined container. */
export function Card({
  variant = "elevated",
  interactive = false,
  onClick,
  children,
  className = "",
  style,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "relative flex flex-col rounded-(--shape-card) text-(--color-on-surface) transition overflow-hidden",
        interactive ? "fx-state cursor-pointer" : "",
        cardVariantClasses(variant, interactive),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-interactive={interactive ? "true" : "false"}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
