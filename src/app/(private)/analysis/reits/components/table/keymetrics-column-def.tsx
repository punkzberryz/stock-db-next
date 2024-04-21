"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ReitsKeyMetricsTableData } from "./data";

interface HeaderCellProps {
  title: string;
}
const HeaderCell = ({ title }: HeaderCellProps) => {
  return <p className="w-[150px] truncate">{title}</p>;
};
const CellWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <div className="w-[100px] text-center">{children}</div>;
};

export const keyMetricsColumns: ColumnDef<ReitsKeyMetricsTableData>[] = [
  {
    accessorKey: "Date",
    header: () => <HeaderCell title="Date" />,
    cell: ({ row }) => <CellWrapper>{row.original.Date}</CellWrapper>,
  },
  {
    accessorKey: "Price",
    header: () => <HeaderCell title="Price" />,
    cell: ({ row }) => <CellWrapper>{row.original.Price}</CellWrapper>,
  },
  {
    accessorKey: "Property Yield",
    header: () => <HeaderCell title="Property Yield" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Property Yield"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Cost of Debt",
    header: () => <HeaderCell title="Cost of Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Cost of Debt"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Yield Spread",
    header: () => <HeaderCell title="Yield Spread" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Yield Spread"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Revenue Growth",
    header: () => <HeaderCell title="Revenue Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Revenue Growth"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Net Profit Growth",
    header: () => <HeaderCell title="Net Profit Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Net Profit Growth"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Net Profit Margin",
    header: () => <HeaderCell title="Net Profit Margin" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Net Profit Margin"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Dividend",
    header: () => <HeaderCell title="Dividend" />,
    cell: ({ row }) => <CellWrapper>{row.original["Dividend"]}</CellWrapper>,
  },
  {
    accessorKey: "Dividend Yield",
    header: () => <HeaderCell title="Dividend Yield" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Dividend Yield"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Dividend Growth",
    header: () => <HeaderCell title="Dividend Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Dividend Growth"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Gearing Ratio (Debt/Assets)",
    header: () => <HeaderCell title="Gearing Ratio (Debt/Assets)" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Gearing Ratio (Debt/Assets)"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Price to Book",
    header: () => <HeaderCell title="Price to Book" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Price to Book"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Price to Earning",
    header: () => <HeaderCell title="Price to Earning" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Price to Earning"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Price to Book Growth",
    header: () => <HeaderCell title="Price to Book Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Price to Book Growth"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Book Value per Share",
    header: () => <HeaderCell title="Book Value Per Share" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Book Value per Share"]}</CellWrapper>
    ),
  },
  {
    accessorKey: "Book Value per Share Growth",
    header: () => <HeaderCell title="Book Value Per Share Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{row.original["Book Value per Share Growth"]}</CellWrapper>
    ),
  },
];
