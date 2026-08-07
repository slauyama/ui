import { HTMLAttributes } from "react";
import { Surface, textColorBySurface } from "../../surfaces";
import { useSurface } from "../../surface-context";

type HeadingVariant = "display" | "title" | "subtitle";
type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingAs;
  variant?: HeadingVariant;
  surface?: Surface;
}

const VARIANTS: Record<HeadingVariant, string> = {
  display: "text-4xl font-extrabold tracking-tight",
  title: "text-2xl font-bold tracking-tight",
  subtitle: "text-lg font-semibold",
};

export function Heading({
  as: Tag = "h2",
  variant = "title",
  surface,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const resolvedSurface = surface ?? useSurface();

  return (
    <Tag
      className={[
        VARIANTS[variant],
        textColorBySurface(resolvedSurface),
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
