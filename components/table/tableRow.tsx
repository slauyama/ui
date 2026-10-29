import { KeyboardEvent, useContext } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RowBorderContext } from "./tableContext";

export type TableRowProps = HTMLMotionProps<"tr">;

const ROW_BORDER = "border-b border-(--color-outline-variant)";
/** 8% matches --state-hover-opacity; the token is a bare number, which color-mix rejects. */
const ROW_CLICKABLE =
  "cursor-pointer hover:bg-(--color-on-surface)/8 focus-visible:[outline:2px_solid_var(--color-primary)] focus-visible:[outline-offset:-2px]";

/** One row. With an onClick it gains a hover state and is focusable, with Enter and Space clicking it. It animates when rows reorder. */
export function TableRow({
  onClick,
  onKeyDown,
  children,
  className = "",
  ...rest
}: TableRowProps) {
  const bordered = useContext(RowBorderContext);
  function clickOnEnterOrSpace(e: KeyboardEvent<HTMLTableRowElement>) {
    onKeyDown?.(e);
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  }
  return (
    <motion.tr
      layout
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={[
        bordered ? ROW_BORDER : "",
        onClick ? ROW_CLICKABLE : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? clickOnEnterOrSpace : onKeyDown}
      {...rest}
    >
      {children}
    </motion.tr>
  );
}
