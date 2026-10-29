import { HTMLAttributes, ReactNode } from "react";
import { TEXT_VARIANT_CLASSES } from "../text/text";

export interface CircularProgressProps extends HTMLAttributes<HTMLSpanElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: number;
  strokeWidth?: number;
  label: string;
  /** Centred inside the ring, e.g. "60%". A string is also announced as the value. */
  children?: ReactNode;
}

function textClasses(size: number) {
  if (size >= 72) return TEXT_VARIANT_CLASSES["title-medium"];
  if (size >= 48) return TEXT_VARIANT_CLASSES["label-large"];
  return TEXT_VARIANT_CLASSES["label-small"];
}

/** Ring spinner or determinate arc. */
export function CircularProgress({
  value = 0,
  max = 1,
  indeterminate = false,
  size = 48,
  strokeWidth = 4,
  label,
  children,
  className = "",
  style,
  ...rest
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const pct = indeterminate ? 0.25 : value / max;
  return (
    <span
      className={["relative inline-flex text-(--color-primary)", className]
        .filter(Boolean)
        .join(" ")}
      data-indeterminate={indeterminate ? "true" : "false"}
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuetext={typeof children === "string" ? children : undefined}
      style={style}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox={"0 0 " + size + " " + size}
        className={
          indeterminate ? "animate-[spin_1.4s_linear_infinite]" : undefined
        }
      >
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
      {children ? (
        <span
          className={`absolute inset-0 flex items-center justify-center tabular-nums text-(--color-on-surface) ${textClasses(size)}`}
        >
          {children}
        </span>
      ) : null}
    </span>
  );
}
