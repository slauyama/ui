import { HTMLAttributes, ReactNode } from "react";
import { bgColorBySurface, Surface } from "../../surfaces";
import { SurfaceProvider } from "../../surface-context";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  surface?: Surface;
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  children: ReactNode;
}

const BASE = "rounded-lg p-2 border border-(--color-outline-subtle) shadow-sm";
const CLICKABLE_CLASSES =
  "cursor-pointer hover:shadow-md hover:border-(--color-outline)";

export function Card({
  className = "",
  surface = "surface",
  onClick,
  children,
  ...props
}: CardProps) {
  return (
    <SurfaceProvider surface={surface}>
      <div
        className={[
          BASE,
          onClick ? CLICKABLE_CLASSES : "",
          bgColorBySurface(surface),
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
