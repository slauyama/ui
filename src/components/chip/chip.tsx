import { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const BASE = "inline-flex items-center justify-center font-medium text-sm transition rounded-full border px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed";

const ACTIVE = "bg-primary text-white border-primary shadow-sm";
const INACTIVE = "bg-secondary text-zinc-600 border-border-primary hover:bg-secondary-hover dark:text-zinc-300";

export function Chip({ active = false, className = "", children, ...props }: ChipProps) {
  return (
    <button
      className={[BASE, active ? ACTIVE : INACTIVE, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
