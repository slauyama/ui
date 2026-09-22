import { HTMLAttributes } from "react";
import { TEXT_VARIANT_CLASSES } from "../text/text";

export type HeadingVariant =
  | "display-hero"
  | "display-large"
  | "display-medium"
  | "display-small"
  | "headline-large"
  | "headline-medium"
  | "headline-small"
  | "title-large"
  | "title-medium"
  | "title-small";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: HeadingVariant;
  color?: string;
}

/**
 * Each role maps to its --typescale-* tokens. Written out in full because
 * Tailwind only generates classes it can read literally from source.
 * title-medium and title-small are shared with Text; title-large sets no tracking, as in Facet.
 */
const VARIANT_CLASSES: Record<HeadingVariant, string> = {
  "display-hero":
    "m-0 [font-family:var(--typescale-display-hero-font)] text-(length:--typescale-display-hero-size) leading-(--typescale-display-hero-line-height) font-(--typescale-display-hero-weight) tracking-(--typescale-display-hero-tracking)",
  "display-large":
    "m-0 [font-family:var(--typescale-display-large-font)] text-(length:--typescale-display-large-size) leading-(--typescale-display-large-line-height) font-(--typescale-display-large-weight) tracking-(--typescale-display-large-tracking)",
  "display-medium":
    "m-0 [font-family:var(--typescale-display-medium-font)] text-(length:--typescale-display-medium-size) leading-(--typescale-display-medium-line-height) font-(--typescale-display-medium-weight) tracking-(--typescale-display-medium-tracking)",
  "display-small":
    "m-0 [font-family:var(--typescale-display-small-font)] text-(length:--typescale-display-small-size) leading-(--typescale-display-small-line-height) font-(--typescale-display-small-weight) tracking-(--typescale-display-small-tracking)",
  "headline-large":
    "m-0 [font-family:var(--typescale-headline-large-font)] text-(length:--typescale-headline-large-size) leading-(--typescale-headline-large-line-height) font-(--typescale-headline-large-weight) tracking-(--typescale-headline-large-tracking)",
  "headline-medium":
    "m-0 [font-family:var(--typescale-headline-medium-font)] text-(length:--typescale-headline-medium-size) leading-(--typescale-headline-medium-line-height) font-(--typescale-headline-medium-weight) tracking-(--typescale-headline-medium-tracking)",
  "headline-small":
    "m-0 [font-family:var(--typescale-headline-small-font)] text-(length:--typescale-headline-small-size) leading-(--typescale-headline-small-line-height) font-(--typescale-headline-small-weight) tracking-(--typescale-headline-small-tracking)",
  "title-large":
    "m-0 [font-family:var(--typescale-title-large-font)] text-(length:--typescale-title-large-size) leading-(--typescale-title-large-line-height) font-(--typescale-title-large-weight)",
  "title-medium": TEXT_VARIANT_CLASSES["title-medium"],
  "title-small": TEXT_VARIANT_CLASSES["title-small"],
};

export function Heading({
  as: Tag = "h2",
  variant = "headline-medium",
  color,
  children,
  className = "",
  ...rest
}: HeadingProps) {
  return (
    <Tag
      className={[VARIANT_CLASSES[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={{ color }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
