import { HTMLAttributes } from "react";
import { Surface, textColorBySurface } from "../../surfaces";
import { useSurface } from "../../surface-context";

type TextAs = "p" | "span" | "label";
type TextSize = "xs" | "sm" | "md" | "lg";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs;
  size?: TextSize;
  surface?: Surface;
}

export function Text({
  as: Tag = "p",
  size = "md",
  surface,
  className = "",
  children,
  ...props
}: TextProps) {
  const contextSurface = useSurface();
  const resolvedSurface = surface ?? contextSurface;
  return (
    <Tag
      className={[
        `text-${size} ${textColorBySurface(resolvedSurface)}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
