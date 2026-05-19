import { HTMLAttributes } from "react";
import { Surface, textColorBySurface } from "../../surfaces";

type TextAs = "p" | "span" | "div" | "label";
type TextSize = "xs" | "sm" | "md" | "lg";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs;
  size?: TextSize;
  surface?: Surface;
}

export function Text({
  as: Tag = "p",
  size = "md",
  surface = "surface",
  className = "",
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={[`text-${size} ${textColorBySurface(surface)}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
