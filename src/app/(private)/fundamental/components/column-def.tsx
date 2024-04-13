"use client";
import { formatCurrency } from "@/lib/format";
import { Fundamental } from "@/schema/stock/fundamental.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const valueToCurrency = (value?: number) => {
  if (!value) return "-";
  return formatCurrency(value, {
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
  });
};

export const fundamentalColumns: ColumnDef<Fundamental>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(row.original.date, "yyyy-MM"),
  },
  {
    accessorKey: "revenue",
    header: "Total Revenue",
    cell: ({ row }) => valueToCurrency(row.original.revenue),
  },
  {
    accessorKey: "operatingCashFlow",
    header: "Operating Cash Flow",
    cell: ({ row }) => valueToCurrency(row.original.operatingCashFlow),
  },
  {
    accessorKey: "capitalExpenditure",
    header: "Capital Expenditure",
    cell: ({ row }) => valueToCurrency(row.original.capitalExpenditure),
  },
  {
    accessorKey: "freeCashFlow",
    header: "Free Cash Flow",
    cell: ({ row }) => valueToCurrency(row.original.freeCashFlow),
  },
  {
    accessorKey: "totalAssets",
    header: "Total Assets",
    cell: ({ row }) => valueToCurrency(row.original.totalAssets),
  },
  {
    accessorKey: "nonCurrentAssets",
    header: "Non Current Assets",
    cell: ({ row }) => valueToCurrency(row.original.nonCurrentAssets),
  },
  {
    accessorKey: "cashFinancial",
    header: "Cash",
    cell: ({ row }) => valueToCurrency(row.original.cashFinancial),
  },
  {
    accessorKey: "totalLiabilities",
    header: "Total Liabilities",
    cell: ({ row }) => valueToCurrency(row.original.totalLiabilities),
  },
  {
    accessorKey: "currentDebt",
    header: "Current Debt",
    cell: ({ row }) => valueToCurrency(row.original.currentDebt),
  },
  {
    accessorKey: "longTermDebt",
    header: "Long Term Debt",
    cell: ({ row }) => valueToCurrency(row.original.longTermDebt),
  },
  {
    accessorKey: "commonStockEquity",
    header: "Common Stock Equity",
  },
  {
    accessorKey: "stockholdersEquity",
    header: "Stockholder Equity",
  },
  { accessorKey: "dilutedEPS", header: "Diluted EPS" },
  { accessorKey: "ebitda", header: "EBITDA" },
  {
    accessorKey: "investedCapital",
    header: "Invested Capital",
    cell: ({ row }) => valueToCurrency(row.original.investedCapital),
  },
];
