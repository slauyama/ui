import { HTMLAttributes } from "react";
import { Surface, textColorBySurface } from "../../surfaces";
import { useSurface } from "../../surface-context";

type TextAs = "p" | "span" | "label" | "td";
type TextSize = "xs" | "sm" | "md" | "lg";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs;
  size?: TextSize;
  surface?: Surface;
  color?: string;
}

const SIZES: Record<TextSize, string> = {
  xs: "text-xs tracking-wide font-light",
  sm: "text-sm font-normal",
  md: "text-base font-normal",
  lg: "text-lg tracking-tight font-normal",
};

export function Text({
  as: Tag = "p",
  size = "md",
  surface,
  color,
  className = "",
  children,
  ...props
}: TextProps) {
  const resolvedSurface = surface ?? useSurface();
  const colorClass = color ?? textColorBySurface(resolvedSurface);
  return (
    <Tag
      className={[SIZES[size], colorClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
