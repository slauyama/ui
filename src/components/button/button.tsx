import { ButtonHTMLAttributes } from "react";
import { SurfaceProvider, useSurface } from "../../surface-context";
import { Text } from "../text/text";
import {
  bgColorBySurface,
  bgHoverColorBySurface,
  Surface,
  textColorBySurface,
} from "../../surfaces";

type Variant = "primary" | "ghost" | "inline";
type Size = "xs" | "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  surface?: Surface;
  size?: Size;
}

const BASE =
  "inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover  hover:shadow-md",
  ghost: "text-on-surface-muted hover:text-on-surface hover:bg-surface-hover",
  inline: "underline",
};

const SIZES: Record<Size, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-md",
};

export function Button({
  variant = "primary",
  surface,
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const contextSurface = useSurface();
  const resolvedSurface = surface ?? contextSurface;

  const variantClass = VARIANTS[variant];

  const colorClass = `${textColorBySurface(resolvedSurface)} ${bgColorBySurface(resolvedSurface)} boreder-(--color-outline) ${bgHoverColorBySurface(resolvedSurface)}`;

  return (
    <SurfaceProvider surface={resolvedSurface}>
      <button
        className={[BASE, variantClass, colorClass, SIZES[size], className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <Text>{children}</Text>
      </button>
    </SurfaceProvider>
  );
}
