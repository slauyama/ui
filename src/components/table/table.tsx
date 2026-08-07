import {
  createContext,
  HTMLAttributes,
  ThHTMLAttributes,
  useContext,
} from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { Text, TextAlign } from "../text/text";
import { SurfaceProvider } from "../../surface-context";
import { Surface } from "../../surfaces";
import { ArrowUpSvg } from "../svgIcons/arrowUp";

const RowBorderContext = createContext(true);

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  surface?: Surface;
  bordered?: boolean;
}

export function Table({
  surface = "surface",
  bordered = true,
  className = "",
  children,
  ...props
}: TableProps) {
  return (
    <SurfaceProvider surface={surface}>
      <RowBorderContext.Provider value={bordered}>
        <div className="w-full overflow-x-auto">
          <table
            className={["w-full border-collapse text-left", className]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {children}
          </table>
        </div>
      </RowBorderContext.Provider>
    </SurfaceProvider>
  );
}

export function TableHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

type TableRowProps = HTMLMotionProps<"tr">;

const ROW_BORDER = "border-b border-(--color-outline-subtle)";
const ROW_CLICKABLE = "cursor-pointer hover:bg-(--color-surface-hover)";

export function TableRow({
  className = "",
  onClick,
  children,
  ...props
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
      {...props}
    >
      {children}
    </motion.tr>
  );
}

type SortDirection = "asc" | "desc";

interface TableHeadProps extends Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "scope"
> {
  align?: TextAlign;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export function TableHead({
  align,
  className = "",
  children,
  sortDirection,
  onSort,
  ...props
}: TableHeadProps) {
  return (
    <Text
      as="th"
      align={align}
      scope="col"
      className={[
        "px-3 py-2 font-semibold tracking-wide",
        onSort ? "cursor-pointer select-none" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      size="xs"
      color="text-(--color-on-surface-muted)"
      isUppercase
      onClick={onSort}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortDirection && (
          <ArrowUpSvg
            className={[
              "size-3 transition-transform duration-200 ease-out",
              sortDirection === "desc" ? "rotate-180" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        )}
      </span>
    </Text>
  );
}

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  align?: TextAlign;
}
export function TableCell({
  className = "",
  align = "left",
  children,
}: TableCellProps) {
  return (
    <Text
      as="td"
      size="sm"
      align={align}
      className={["px-3 py-2", className].filter(Boolean).join(" ")}
    >
      {children}
    </Text>
  );
}
