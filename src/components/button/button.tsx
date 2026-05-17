import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "pill" | "inline";
type Color = "default" | "destructive";
type Size = "xs" | "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  active?: boolean;
}

const BASE =
  "inline-flex items-center justify-center font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover rounded-lg shadow-sm",
  secondary:
    "bg-secondary border border-border-primary text-zinc-600 hover:bg-secondary-hover rounded-lg dark:text-zinc-300",
  ghost:
    "text-zinc-500 hover:text-zinc-700 hover:bg-secondary-hover rounded-lg dark:text-zinc-400 dark:hover:text-zinc-200",
  pill: "rounded-full border",
  inline: "text-primary/70 underline hover:text-primary",
};

const DESTRUCTIVE: Partial<Record<Variant, string>> = {
  primary: "bg-red-500 text-white hover:bg-red-600 rounded-lg shadow-sm",
  secondary:
    "border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 rounded-lg",
  ghost:
    "text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg",
  inline: "text-red-400 underline hover:text-red-600",
};

const SIZES: Record<Size, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
};

const PILL_COLOR = {
  active: "bg-primary text-white border-primary shadow-sm",
  inactive:
    "bg-secondary text-zinc-600 border-border-primary hover:bg-secondary-hover dark:text-zinc-300",
};

export function Button({
  variant = "primary",
  color = "default",
  size = "md",
  active,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClass =
    color === "destructive" && DESTRUCTIVE[variant]
      ? DESTRUCTIVE[variant]!
      : VARIANTS[variant];

  const pillColor =
    variant === "pill"
      ? active
        ? PILL_COLOR.active
        : PILL_COLOR.inactive
      : "";

  return (
    <button
      className={[BASE, variantClass, SIZES[size], pillColor, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
