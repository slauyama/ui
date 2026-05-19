import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inline";
type Color = "primary" | "surface" | "error";
type Size = "xs" | "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: Size;
}

const BASE =
  "inline-flex cursor-pointer items-center justify-center font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover rounded-lg shadow-sm",
  secondary:
    "bg-surface border border-outline text-on-surface-muted hover:bg-surface-hover rounded-lg",
  ghost:
    "text-on-surface-muted hover:text-on-surface hover:bg-surface-hover rounded-lg",
  inline: "text-primary/70 underline hover:text-primary",
};

const DESTRUCTIVE: Partial<Record<Variant, string>> = {
  primary: "bg-error text-on-error hover:bg-error-hover rounded-lg shadow-sm",
  secondary: "border border-error/30 text-error hover:bg-error/10 rounded-lg",
  ghost: "text-error/80 hover:text-error hover:bg-error/10 rounded-lg",
  inline: "text-error/80 underline hover:text-error",
};

const SIZES: Record<Size, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "primary",
  color = "surface",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClass =
    color === "error" && DESTRUCTIVE[variant]
      ? DESTRUCTIVE[variant]!
      : VARIANTS[variant];

  return (
    <button
      className={[BASE, variantClass, SIZES[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
