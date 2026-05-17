import { HTMLAttributes } from "react";

type TextVariant = "body" | "label" | "caption" | "muted";
type TextAs = "p" | "span" | "div" | "label";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs;
  variant?: TextVariant;
}

const VARIANTS: Record<TextVariant, string> = {
  body:    "text-sm text-on-surface-muted",
  label:   "text-sm font-medium text-on-surface-muted",
  caption: "text-xs text-on-surface-muted",
  muted:   "text-xs text-on-surface-subtle",
};

export function Text({
  as: Tag = "p",
  variant = "body",
  className = "",
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={[VARIANTS[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
