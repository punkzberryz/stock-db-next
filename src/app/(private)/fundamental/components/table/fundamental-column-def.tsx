"use client";
import { ColumnDef } from "@tanstack/react-table";
import { FundamentalTableData } from "./data";

export const fundamentalColumns: ColumnDef<FundamentalTableData>[] = [
  {
    accessorKey: "Date",
  },
  {
    accessorKey: "Total Revenue",
  },
  {
    accessorKey: "Earnings",
  },
  {
    accessorKey: "Operating Cash Flow",
  },
  {
    accessorKey: "Free Cash Flow",
  },
  {
    accessorKey: "Total Assets",
  },
  {
    accessorKey: "Property Plant Equipment Net",
  },
  { accessorKey: "Total Liabilities" },
  { accessorKey: "Current Debt" },
  { accessorKey: "Long Term Debt" },
  { accessorKey: "Total Debt" },
  { accessorKey: "Interest Expense" },
  { accessorKey: "Total Equity" },
  { accessorKey: "Share Outstanding" },
];
