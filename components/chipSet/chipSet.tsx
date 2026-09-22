import { ReactNode } from "react";

export interface ChipSetProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Horizontal wrapper for a run of chips. `role="group"`, not `"listbox"`: chips are independently
 * actionable buttons (each with its own `aria-pressed` where relevant), not `option` children of a
 * single-select composite widget, and `listbox` requires exactly that structure.
 */
export function ChipSet({ children, className = "", ...rest }: ChipSetProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 items-center ${className}`}
      role="group"
      {...rest}
    >
      {children}
    </div>
  );
}
