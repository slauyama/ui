import { HTMLAttributes } from "react";
import { Surface, textColorBySurface } from "../../surfaces";

type HeadingVariant = "display" | "title" | "subtitle";
type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingAs;
  variant?: HeadingVariant;
  surface?: Surface;
}

const VARIANTS: Record<HeadingVariant, string> = {
  display: "text-2xl font-bold",
  title: "text-xl font-bold",
  subtitle: "text-lg font-semibold",
};

export function Heading({
  as: Tag = "h2",
  variant = "title",
  surface = "surface",
  className = "",
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={[VARIANTS[variant], textColorBySurface(surface), className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
