import { ButtonHTMLAttributes } from "react";
import {
  bgColorBySurface,
  bgHoverColorBySurface,
  textColorBySurface,
} from "../../surfaces";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const BASE =
  "inline-flex items-center border-(--color-outline) justify-center font-medium text-sm rounded-full border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed";

const TRANSITION =
  "background var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)";

const ACTIVE = `${bgColorBySurface("primary")} ${textColorBySurface("primary")} shadow-sm`;
const INACTIVE = `${bgColorBySurface("surface")} ${textColorBySurface("surface")} ${bgHoverColorBySurface("surface")}`;

export function Chip({
  active = false,
  className = "",
  style,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      className={[BASE, active ? ACTIVE : INACTIVE, className]
        .filter(Boolean)
        .join(" ")}
      style={{ transition: TRANSITION, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
