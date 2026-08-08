import { HTMLAttributes, ReactNode } from "react";
import {
  bgColorBySurface,
  bgContainerColorBySurface,
  bgContainerHoverColorBySurface,
  Surface,
} from "../../surfaces";
import { SurfaceProvider } from "../../surface-context";

type Variant = "elevated" | "filled" | "outlined";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  surface?: Surface;
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  children: ReactNode;
}

const BASE = "rounded-xl p-2 border";

function variantStyle(variant: Variant, surface: Surface, clickable: boolean) {
  switch (variant) {
    case "elevated":
      return [
        bgColorBySurface(surface),
        "border-transparent shadow-md",
        clickable ? "cursor-pointer hover:shadow-lg" : "",
      ];
    case "filled":
      return [
        bgContainerColorBySurface(surface),
        "border-transparent",
        clickable
          ? `cursor-pointer ${bgContainerHoverColorBySurface(surface)}`
          : "",
      ];
    case "outlined":
      return [
        bgColorBySurface(surface),
        "border-(--color-outline-subtle)",
        clickable ? "cursor-pointer hover:border-(--color-outline)" : "",
      ];
  }
}

export function Card({
  className = "",
  surface = "surface",
  variant = "elevated",
  onClick,
  children,
  ...props
}: CardProps) {
  return (
    <SurfaceProvider surface={surface}>
      <div
        className={[
          BASE,
          ...variantStyle(variant, surface, !!onClick),
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    </SurfaceProvider>
  );
}
