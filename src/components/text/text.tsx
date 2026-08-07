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

export function Text({
  as: Tag = "p",
  size = "md",
  surface,
  color,
  className = "",
  children,
  ...props
}: TextProps) {
  const contextSurface = useSurface();
  const resolvedSurface = surface ?? contextSurface;
  const colorClass = color ?? textColorBySurface(resolvedSurface);
  return (
    <Tag
      className={[`text-${size}`, colorClass, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
