import { HTMLAttributes } from "react";

/** 1px outline-variant rule. */
export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** 16px inset on both sides. */
  inset?: boolean;
  /** 16px inset on the leading side only, to align with list text. */
  insetStart?: boolean;
  vertical?: boolean;
}

/** 1px outline-variant rule. The only square-cornered element in Facet. */
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
