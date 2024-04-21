"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReitsFundamentalTableData } from "./data";

interface HeaderCellProps {
  title: string;
}
const HeaderCell = ({ title }: HeaderCellProps) => {
  return <p className="w-[150px] truncate">{title}</p>;
};
const CellWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <div className="w-[100px] text-center">{children}</div>;
};

export const fundamentalColumns: ColumnDef<ReitsFundamentalTableData>[] = [
  {
    accessorKey: "Date",
    header: () => <HeaderCell title="Date" />,
    cell: ({ row }) => <CellWrapper>{row.original.Date}</CellWrapper>,
  },
  {
    accessorKey: "Total Revenue",
    header: () => <HeaderCell title="Total Revenue" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Total Revenue"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Earnings",
    header: () => <HeaderCell title="Earnings" />,
    cell: ({ row }) => <CellWrapper>{row.original["Earnings"]}</CellWrapper>,
  },
  {
    accessorKey: "Operating Cash Flow",
    header: () => <HeaderCell title="Operating Cash Flow" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Operating Cash Flow"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Free Cash Flow",
    header: () => <HeaderCell title="Free Cash Flow" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Free Cash Flow"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Total Assets",
    header: () => <HeaderCell title="Total Assets" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Total Assets"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Non Current Assets",
    header: () => <HeaderCell title="Non Current Assets" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Non Current Assets"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Property Plant Equipment Net",
    header: () => <HeaderCell title="Property Plant Equipment Net" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Property Plant Equipment Net"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Total Liabilities",
    header: () => <HeaderCell title="Total Liabilities" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Total Liabilities"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Current Debt",
    header: () => <HeaderCell title="Short Term Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Current Debt"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Long Term Debt",
    header: () => <HeaderCell title="Long Term Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Long Term Debt"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Total Debt",
    header: () => <HeaderCell title="Total Debt" />,
    cell: ({ row }) => <CellWrapper>{row.original["Total Debt"]}</CellWrapper>,
  },
  {
    accessorKey: "Interest Expense",
    header: () => <HeaderCell title="Interest Expense" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Interest Expense"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Total Equity",
    header: () => <HeaderCell title="Total Equity" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Total Equity"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Share Outstanding",
    header: () => <HeaderCell title="Share Outstanding" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Share Outstanding"]}</CellWrapper>
    ),
  },
];
