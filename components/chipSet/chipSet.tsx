import { ReactNode } from "react";

export interface ChipSetProps {
  children?: ReactNode;
  className?: string;
}

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
