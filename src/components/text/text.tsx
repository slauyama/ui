import { HTMLAttributes } from "react";
import { Surface, textColorBySurface } from "../../surfaces";
import { useSurface } from "../../surface-context";

type TextAs = "p" | "span" | "label" | "td" | "th";
type TextSize = "xs" | "sm" | "md" | "lg";
export type TextAlign = "left" | "right" | "center";

interface TextProps extends HTMLAttributes<HTMLElement> {
  align?: TextAlign;
  as?: TextAs;
  color?: string;
  isUppercase?: boolean;
  scope?: "col" | "row";
  size?: TextSize;
  surface?: Surface;
}

const SIZES: Record<TextSize, string> = {
  xs: "text-xs tracking-wide font-light",
  sm: "text-sm font-normal",
  md: "text-base font-normal",
  lg: "text-lg tracking-tight font-normal",
};

const ALIGN: Record<TextAlign, string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

export function Text({
  align,
  as: Tag = "p",
  children,
  className = "",
  color,
  isUppercase = false,
  scope,
  size = "md",
  surface,
  ...props
}: TextProps) {
  const resolvedSurface = surface ?? useSurface();
  const colorClass = color ?? textColorBySurface(resolvedSurface);
  return (
    <Tag
      className={[
        SIZES[size],
        align ? ALIGN[align] : "",
        colorClass,
        isUppercase ? "uppercase" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      scope={scope}
      {...props}
    >
      {children}
    </Tag>
  );
}
