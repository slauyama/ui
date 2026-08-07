import { HTMLAttributes } from "react";
import { useSurface } from "../../surface-context";
import { textColorBySurface } from "../../surfaces";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SpinnerProps extends HTMLAttributes<SVGSVGElement> {
  size?: SpinnerSize;
}

const SIZES: Record<SpinnerSize, string> = {
  xs: "size-3 border-1",
  sm: "size-4 border-1",
  md: "size-6 border-2",
  lg: "size-8 border-2",
  xl: "size-12 border-4",
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const surface = useSurface();

  return (
    <div
      className={`${SIZES[size]} animate-spin rounded-full border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${textColorBySurface(surface)} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
