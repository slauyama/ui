import { useContext } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { RowBorderContext } from "./tableContext";

export type TableRowProps = HTMLMotionProps<"tr">;

const ROW_BORDER = "border-b border-(--color-outline-variant)";
/** 8% matches --state-hover-opacity; the token is a bare number, which color-mix rejects. */
const ROW_CLICKABLE = "cursor-pointer hover:bg-(--color-on-surface)/8";

/** One row. Gains a hover state when it has an onClick, and animates when rows reorder. */
export function TableRow({
  onClick,
  children,
  className = "",
  ...rest
}: TableRowProps) {
  const bordered = useContext(RowBorderContext);
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
      {...rest}
    >
      {children}
    </motion.tr>
  );
}
