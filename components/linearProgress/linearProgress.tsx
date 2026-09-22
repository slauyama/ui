import { HTMLAttributes } from "react";

/**
 * 4px progress bar, determinate or indeterminate.
 */
export interface LinearProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  /** Accessible name, e.g. "Upload progress". Required: a progressbar with none is a dead end for screen readers. */
  label: string;
}

/** 4px determinate or indeterminate bar. */
export function LinearProgress({
  value = 0,
  max = 1,
  indeterminate = false,
  label,
  className = "",
  style,
  ...rest
}: LinearProgressProps) {
  return (
    <div
      className={`relative w-full h-1 rounded-sm bg-(--color-secondary-container) overflow-hidden ${className}`}
      data-indeterminate={indeterminate ? "true" : "false"}
      role="progressbar"
      aria-label={label}
      aria-valuenow={indeterminate ? undefined : value}
      style={style}
      {...rest}
    >
      <div
        className={[
          "absolute inset-y-0 left-0 bg-(--color-primary) rounded-sm transition-[width] duration-(--motion-duration-short4) ease-(--motion-easing-standard)",
          indeterminate
            ? "w-2/5 animate-[linear-slide_2s_var(--motion-easing-standard)_infinite]"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={indeterminate ? undefined : { width: (value / max) * 100 + "%" }}
      />
    </div>
  );
}
