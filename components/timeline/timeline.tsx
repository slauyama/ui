import { LiHTMLAttributes, OlHTMLAttributes, ReactNode } from "react";
import { TEXT_VARIANT_CLASSES } from "../text/text";

export type TimelineProps = OlHTMLAttributes<HTMLOListElement>;

export type TimelineStatus = "complete" | "in-progress" | "incomplete";

export interface TimelineItemProps extends LiHTMLAttributes<HTMLLIElement> {
  headline?: ReactNode;
  timestamp?: ReactNode;
  /** Solid dot when complete, ringed when in progress, empty when incomplete. The line after anything not complete is dotted. */
  status?: TimelineStatus;
}

const DOT_CLASSES: Record<TimelineStatus, string> = {
  complete: "size-3 rounded-full bg-(--color-primary)",
  "in-progress":
    "flex items-center justify-center size-3 rounded-full border border-solid border-(--color-primary)",
  incomplete:
    "size-3 rounded-full border-2 border-solid border-(--color-outline)",
};

const LINE_CLASSES: Record<TimelineStatus, string> = {
  complete: "border-solid",
  "in-progress": "border-dotted",
  incomplete: "border-dotted",
};

function TimelineRoot({ children, className = "", ...rest }: TimelineProps) {
  return (
    <ol className={`flex flex-col m-0 p-0 list-none ${className}`} {...rest}>
      {children}
    </ol>
  );
}

function TimelineItem({
  headline,
  timestamp,
  status = "complete",
  children,
  className = "",
  ...rest
}: TimelineItemProps) {
  const firstLineHeight = timestamp
    ? "h-(--typescale-label-medium-line-height)"
    : headline
      ? "h-(--typescale-title-medium-line-height)"
      : "h-(--typescale-body-medium-line-height)";
  return (
    <li
      className={`group/timeline flex gap-4 ${className}`}
      data-status={status}
      aria-current={status === "in-progress" ? "step" : undefined}
      {...rest}
    >
      <span aria-hidden="true" className="flex flex-col items-center flex-none">
        <span className={`flex items-center ${firstLineHeight}`}>
          <span className={DOT_CLASSES[status]}>
            {status === "in-progress" ? (
              <span className="size-1 rounded-full bg-(--color-primary)" />
            ) : null}
          </span>
        </span>
        <span
          className={`fx-reset flex-1 border-l-2 border-(--color-outline-variant) group-last/timeline:hidden ${LINE_CLASSES[status]}`}
        />
      </span>
      <div className="flex flex-col gap-1 min-w-0 flex-1 pb-6 group-last/timeline:pb-0">
        {timestamp ? (
          <span
            className={`${TEXT_VARIANT_CLASSES["label-medium"]} text-(--color-on-surface-variant)`}
          >
            {timestamp}
          </span>
        ) : null}
        {headline ? (
          <span
            className={`${TEXT_VARIANT_CLASSES["title-medium"]} text-(--color-on-surface)`}
          >
            {headline}
          </span>
        ) : null}
        {children ? (
          <div
            className={`${TEXT_VARIANT_CLASSES["body-medium"]} text-(--color-on-surface-variant)`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export const Timeline = Object.assign(TimelineRoot, { Item: TimelineItem });
