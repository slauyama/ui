import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  color?: string;
}

const BASE = "text-xs block mb-1 font-bold uppercase tracking-wide";

export function Label({
  className = "",
  color = "text-(--color-on-surface-muted)",
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={[BASE, color, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </label>
  );
}
