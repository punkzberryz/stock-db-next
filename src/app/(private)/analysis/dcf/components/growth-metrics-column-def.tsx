"use client";

import { AverageFinancialGrowthRate } from "@/app/api/lib/api/fmp/fmp-api";
import { valueToPercent } from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";

export const growthMetricsColumnDef: ColumnDef<AverageFinancialGrowthRate>[] = [
  {
    accessorKey: "numberOfYears",
    header: "Number of Years Average",
  },
  {
    accessorKey: "revenueGrowth",
    header: "Revenue Growth",
    cell: ({ row }) => valueToPercent(row.original.revenueGrowth),
  },
  {
    accessorKey: "ebitgrowth",
    header: "EBIT Growth",
    cell: ({ row }) => valueToPercent(row.original.ebitgrowth),
  },
  {
    accessorKey: "freeCashFlowGrowth",
    header: "Free Cash Flow Growth",
    cell: ({ row }) => valueToPercent(row.original.freeCashFlowGrowth),
  },
  {
    accessorKey: "epsgrowth",
    header: "EPS Growth",
    cell: ({ row }) => valueToPercent(row.original.epsgrowth),
  },
];
