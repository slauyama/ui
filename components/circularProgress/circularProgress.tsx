import { HTMLAttributes } from "react";

export interface CircularProgressProps extends HTMLAttributes<HTMLSpanElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: number;
  strokeWidth?: number;
  label: string;
}

/** Ring spinner or determinate arc. */
export function CircularProgress({
  value = 0,
  max = 1,
  indeterminate = false,
  size = 48,
  strokeWidth = 4,
  label,
  className = "",
  style,
  ...rest
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const pct = indeterminate ? 0.25 : value / max;
  return (
    <span
      className={[
        "inline-flex text-(--color-primary)",
        indeterminate ? "animate-[spin_1.4s_linear_infinite]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-indeterminate={indeterminate ? "true" : "false"}
      role="progressbar"
      aria-label={label}
      style={style}
      {...rest}
    >
      <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--color-secondary-container)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform={"rotate(-90 " + size / 2 + " " + size / 2 + ")"}
          style={{ transition: "stroke-dashoffset var(--motion-state)" }}
        />
      </svg>
    </span>
  );
}
