import { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** inset on both sides. */
  inset?: boolean;
  /** inset on the leading side only, aligns with list text. */
  insetStart?: boolean;
  vertical?: boolean;
}

export function Divider({
  inset = false,
  insetStart = false,
  vertical = false,
  className = "",
  style,
  ...rest
}: DividerProps) {
  return (
    <hr
      className={[
        "border-none m-0 shrink-0 grow-0 bg-(--color-outline-variant)",
        vertical ? "w-px h-auto self-stretch" : "h-px w-full",
        !vertical && inset ? "mx-4 w-auto" : "",
        !vertical && !inset && insetStart ? "ms-4 w-auto" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-inset={inset ? "true" : "false"}
      data-inset-start={insetStart ? "true" : "false"}
      data-vertical={vertical ? "true" : "false"}
      style={style}
      {...rest}
    />
  );
}
