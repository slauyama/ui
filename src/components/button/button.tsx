import { ButtonHTMLAttributes, ReactNode } from "react";
import { SurfaceProvider, useSurface } from "../../surface-context";
import { Text } from "../text/text";
import { Spinner } from "../spinner/spinner";
import {
  accentTextColorBySurface,
  bgColorBySurface,
  bgHoverColorBySurface,
  bgTintHoverColorBySurface,
  Surface,
  textColorBySurface,
} from "../../surfaces";

type Variant = "filled" | "tonal" | "elevated" | "outlined" | "text";
type Size = "xs" | "sm" | "md" | "lg";
type Color = "default" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  surface?: Surface;
  size?: Size;
  color?: Color;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

interface VariantStyle {
  container: string;
  textColor: string;
  contentExtra?: string;
}

const DEFAULT_SURFACE_BY_VARIANT: Record<Variant, Surface> = {
  filled: "primary",
  tonal: "secondary",
  elevated: "primary",
  outlined: "primary",
  text: "primary",
};

// M3 "tonal" buttons render on the container pairing of their accent role.
const CONTAINER_SURFACE: Partial<Record<Surface, Surface>> = {
  primary: "primary-container",
  secondary: "secondary-container",
  tertiary: "tertiary-container",
};

const BASE =
  "group inline-flex cursor-pointer items-center justify-center gap-2 border font-medium transition-all duration-150 ease-out active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)";

const SIZES: Record<Size, string> = {
  xs: "px-2.5 py-1 rounded-md",
  sm: "px-3 py-1.5 rounded-lg",
  md: "px-4 py-2 rounded-lg",
  lg: "px-5 py-2.5 rounded-xl",
};

const ICON_SIZE: Record<Size, string> = {
  xs: "[&>svg]:size-3.5",
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-5",
};

// Every variant sets its own border-color exactly once (never both a
// transparent default and a colored override), so there's nothing to fight
// via specificity or `!important`.
function variantStyle(variant: Variant, resolvedSurface: Surface): VariantStyle {
  switch (variant) {
    case "filled":
      return {
        container: `border-transparent ${bgColorBySurface(resolvedSurface)} ${bgHoverColorBySurface(resolvedSurface)} hover:shadow-md active:shadow-md`,
        textColor: textColorBySurface(resolvedSurface),
      };
    case "tonal": {
      const containerSurface =
        CONTAINER_SURFACE[resolvedSurface] ?? resolvedSurface;
      return {
        container: `border-transparent ${bgColorBySurface(containerSurface)} ${bgHoverColorBySurface(containerSurface)} hover:shadow-md`,
        textColor: textColorBySurface(containerSurface),
      };
    }
    case "elevated":
      return {
        container: `border-transparent ${bgColorBySurface("surface")} shadow-md hover:shadow-lg ${bgTintHoverColorBySurface(resolvedSurface)}`,
        textColor: accentTextColorBySurface(resolvedSurface),
      };
    case "outlined":
      return {
        container: `border-(--color-outline) bg-transparent ${bgTintHoverColorBySurface(resolvedSurface)}`,
        textColor: accentTextColorBySurface(resolvedSurface),
      };
    case "text":
      return {
        container: `border-transparent bg-transparent ${bgTintHoverColorBySurface(resolvedSurface)}`,
        textColor: accentTextColorBySurface(resolvedSurface),
      };
  }
}

const DESTRUCTIVE_STYLE: Record<Variant, VariantStyle> = {
  filled: {
    container:
      "border-transparent bg-(--color-error) hover:bg-(--color-error-hover) hover:shadow-md active:shadow-sm",
    textColor: "text-(--color-on-error)",
  },
  tonal: {
    container:
      "border-transparent bg-(--color-error)/10 hover:bg-(--color-error)/20",
    textColor: "text-(--color-error)",
  },
  elevated: {
    container:
      "border-transparent bg-(--color-surface) shadow-sm hover:shadow-md hover:bg-(--color-error)/10",
    textColor: "text-(--color-error)",
  },
  outlined: {
    container:
      "border-(--color-error) bg-transparent hover:bg-(--color-error)/10",
    textColor: "text-(--color-error)",
  },
  text: {
    container: "border-transparent bg-transparent hover:bg-(--color-error)/10",
    textColor: "text-(--color-error)",
  },
};

export function Button({
  variant = "filled",
  surface,
  size = "md",
  color = "default",
  isLoading = false,
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const contextSurface = useSurface();
  const isDestructive = color === "destructive";

  const resolvedSurface = isDestructive
    ? "error"
    : (surface ?? DEFAULT_SURFACE_BY_VARIANT[variant] ?? contextSurface);

  const { container, textColor, contentExtra } = isDestructive
    ? DESTRUCTIVE_STYLE[variant]
    : variantStyle(variant, resolvedSurface);

  const iconClass = [textColor, contentExtra, "inline-flex shrink-0", ICON_SIZE[size]]
    .filter(Boolean)
    .join(" ");

  return (
    <SurfaceProvider surface={resolvedSurface}>
      <button
        className={[BASE, container, SIZES[size], className]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === "lg" ? "md" : "sm"} className={iconClass} />
        ) : (
          leadingIcon && <span className={iconClass}>{leadingIcon}</span>
        )}
        <Text as="span" size={size} color={textColor} className={contentExtra}>
          {children}
        </Text>
        {!isLoading && trailingIcon && (
          <span className={iconClass}>{trailingIcon}</span>
        )}
      </button>
    </SurfaceProvider>
  );
}
