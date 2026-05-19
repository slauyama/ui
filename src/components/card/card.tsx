import { HTMLAttributes, ReactNode } from "react";
import { bgColorBySurface, Surface } from "../../surfaces";
import { SurfaceProvider } from "../../surface-context";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: Surface;
  children: ReactNode;
}

const BASE = "rounded-lg p-2 border border-(--color-outline-subtle) shadow-sm";

export function Card({
  className = "",
  surface = "surface",
  children,
  ...props
}: CardProps) {
  return (
    <SurfaceProvider surface={surface}>
      <div
        className={[BASE, bgColorBySurface(surface), className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    </SurfaceProvider>
  );
}
