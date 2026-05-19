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
  "inline-flex items-center border-(--color-outline) justify-center font-medium text-sm transition rounded-full border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed";

const ACTIVE = `${bgColorBySurface("primary")} ${textColorBySurface("primary")} shadow-sm`;
const INACTIVE = `${bgColorBySurface("surface")} ${textColorBySurface("surface")} hover:${bgHoverColorBySurface("surface")}`;

export function Chip({
  active = false,
  className = "",
  children,
  ...props
}: ChipProps) {
  return (
    <button
      className={[BASE, active ? ACTIVE : INACTIVE, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
