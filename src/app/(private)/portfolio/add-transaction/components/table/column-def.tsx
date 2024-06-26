"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TransactionTableData } from "./format-data";
import CellActionButtons from "./cell-action-buttons";

interface HeaderCellProps {
  title: string;
}
const HeaderCell = ({ title }: HeaderCellProps) => {
  return <p className="w-fit truncate">{title}</p>;
};
const CellWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <div className="w-fit text-center">{children}</div>;
};

export const transactionColumns: ColumnDef<TransactionTableData>[] = [
  {
    accessorKey: "Date",
    header: () => <HeaderCell title="Date" />,
    cell: ({ row }) => <CellWrapper>{row.original.Date}</CellWrapper>,
  },
  {
    accessorKey: "Symbol",
    header: () => <HeaderCell title="Symbol" />,
    cell: ({ row }) => <CellWrapper>{row.original.Symbol}</CellWrapper>,
  },
  {
    accessorKey: "Type",
    header: () => <HeaderCell title="Type" />,
    cell: ({ row }) => <CellWrapper>{row.original.Type}</CellWrapper>,
  },
  {
    accessorKey: "Price",
    header: () => <HeaderCell title="Price" />,
    cell: ({ row }) => <CellWrapper>{row.original.Price}</CellWrapper>,
  },
  {
    accessorKey: "Unit",
    header: () => <HeaderCell title="Unit" />,
    cell: ({ row }) => <CellWrapper>{row.original.Unit}</CellWrapper>,
  },
  {
    accessorKey: "Value",
    header: () => <HeaderCell title="Value" />,
    cell: ({ row }) => <CellWrapper>{row.original.Value}</CellWrapper>,
  },
  {
    accessorKey: "Fee",
    header: () => <HeaderCell title="Fee" />,
    cell: ({ row }) => <CellWrapper>{row.original.Fee}</CellWrapper>,
  },
  {
    accessorKey: "action",
    header: () => <HeaderCell title="Action" />,
    cell: ({ row }) => <CellActionButtons transactionId={row.original.id} />,
  },
];
