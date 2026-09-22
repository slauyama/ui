import { HTMLAttributes } from "react";
import { RowBorderContext } from "./tableContext";
import { TableBody } from "./tableBody";
import { TableCell } from "./tableCell";
import { TableHead } from "./tableHead";
import { TableHeader } from "./tableHeader";
import { TableRow } from "./tableRow";

/** A data table. Compose it from Table.Header, Table.Body, Table.Row, Table.Head and Table.Cell. */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Draw a divider under every row. */
  bordered?: boolean;
}

function TableRoot({
  bordered = true,
  children,
  className = "",
  ...rest
}: TableProps) {
  return (
    <RowBorderContext.Provider value={bordered}>
      <div className="w-full overflow-x-auto">
        <table
          className={["w-full border-collapse text-start", className]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {children}
        </table>
      </div>
    </RowBorderContext.Provider>
  );
}

/** A data table: `<Table><Table.Header><Table.Row><Table.Head>Name</Table.Head></Table.Row></Table.Header>…</Table>`. */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});
