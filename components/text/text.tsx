import { ElementType, HTMLAttributes } from "react";

export type TextVariant =
  | "body-large"
  | "body-medium"
  | "body-small"
  | "title-medium"
  | "title-small"
  | "label-large"
  | "label-medium"
  | "label-small"
  | "code";

export type TextAlign = "left" | "center" | "right";

/** Body, label, small-title or code copy set in one Facet type-scale role. Inherits its colour. */
export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label" | "td" | "th";
  variant?: TextVariant;
  align?: TextAlign;
  /** Overrides the inherited colour. */
  color?: string;
  scope?: "col" | "row";
}

/**
 * Each role maps to its --typescale-* tokens. Written out in full because
 * Tailwind only generates classes it can read literally from source.
 * Body roles set no weight and title-large sets no tracking, as in Facet.
 */
export const TEXT_VARIANT_CLASSES: Record<TextVariant, string> = {
  "body-large":
    "m-0 [font-family:var(--typescale-body-large-font)] text-(length:--typescale-body-large-size) leading-(--typescale-body-large-line-height) tracking-(--typescale-body-large-tracking)",
  "body-medium":
    "m-0 [font-family:var(--typescale-body-medium-font)] text-(length:--typescale-body-medium-size) leading-(--typescale-body-medium-line-height) tracking-(--typescale-body-medium-tracking)",
  "body-small":
    "m-0 [font-family:var(--typescale-body-small-font)] text-(length:--typescale-body-small-size) leading-(--typescale-body-small-line-height) tracking-(--typescale-body-small-tracking)",
  "title-medium":
    "m-0 [font-family:var(--typescale-title-medium-font)] text-(length:--typescale-title-medium-size) leading-(--typescale-title-medium-line-height) font-(--typescale-title-medium-weight) tracking-(--typescale-title-medium-tracking)",
  "title-small":
    "m-0 [font-family:var(--typescale-title-small-font)] text-(length:--typescale-title-small-size) leading-(--typescale-title-small-line-height) font-(--typescale-title-small-weight) tracking-(--typescale-title-small-tracking)",
  "label-large":
    "m-0 [font-family:var(--typescale-label-large-font)] text-(length:--typescale-label-large-size) leading-(--typescale-label-large-line-height) font-(--typescale-label-large-weight) tracking-(--typescale-label-large-tracking)",
  "label-medium":
    "m-0 [font-family:var(--typescale-label-medium-font)] text-(length:--typescale-label-medium-size) leading-(--typescale-label-medium-line-height) font-(--typescale-label-medium-weight) tracking-(--typescale-label-medium-tracking)",
  "label-small":
    "m-0 [font-family:var(--typescale-label-small-font)] text-(length:--typescale-label-small-size) leading-(--typescale-label-small-line-height) font-(--typescale-label-small-weight) tracking-(--typescale-label-small-tracking)",
  code: "m-0 [font-family:var(--typescale-code-font)] text-(length:--typescale-code-size) leading-(--typescale-code-line-height)",
};

const ALIGN_CLASSES: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/** Body, label or code copy in a Facet type-scale role. */
export function Text({
  as: Tag = "p",
  variant = "body-medium",
  align,
  color,
  scope,
  children,
  className = "",
  ...rest
}: TextProps) {
  const Component: ElementType = Tag;
  return (
    <Component
      className={[
        TEXT_VARIANT_CLASSES[variant],
        align ? ALIGN_CLASSES[align] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      scope={scope}
      style={{ color }}
      {...rest}
    >
      {children}
    </Component>
  );
}
