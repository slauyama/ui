import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inline";
type Color = "default" | "destructive";
type Size = "xs" | "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: Size;
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
  inline: "text-primary/70 underline hover:text-primary",
};

const DESTRUCTIVE: Partial<Record<Variant, string>> = {
  primary: "bg-destructive text-white hover:bg-destructive-hover rounded-lg shadow-sm",
  secondary:
    "border border-destructive/30 text-destructive hover:bg-destructive/10 rounded-lg",
  ghost:
    "text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg",
  inline: "text-destructive/80 underline hover:text-destructive",
};

const SIZES: Record<Size, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "primary",
  color = "default",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClass =
    color === "destructive" && DESTRUCTIVE[variant]
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
