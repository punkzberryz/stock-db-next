"use client";
import {
  formatDateString,
  valueToCurrency,
  valueToUnit,
  valueToPercent,
} from "@/lib/format";
import { ReitsFundamental } from "@/schema/stock/fundamental.schema";
import { ColumnDef } from "@tanstack/react-table";

export const reitsFundamentalColumns: ColumnDef<ReitsFundamental>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      formatDateString(row.original.date, { excludeDay: true }),
  },
  {
    accessorKey: "revenue",
    header: "Total Revenue",
    cell: ({ row }) => valueToCurrency(row.original.revenue),
  },
  {
    accessorKey: "netIncome",
    header: "Earnings",
    cell: ({ row }) => valueToCurrency(row.original.netIncome),
  },
  {
    accessorKey: "operatingCashFlow",
    header: "Operating Cash Flow",
    cell: ({ row }) => valueToCurrency(row.original.operatingCashFlow),
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
    accessorKey: "investmentProperties",
    header: "Property Investment",
    cell: ({ row }) => valueToCurrency(row.original.investmentProperties),
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
    accessorKey: "totalDebt",
    header: "Total Debt",
    cell: ({ row }) => valueToCurrency(row.original.totalDebt),
  },
  {
    accessorKey: "interestExpense",
    header: "Interest Expense (cost of debt)",
    cell: ({ row }) => valueToCurrency(row.original.interestExpense),
  },
  {
    accessorKey: "stockholdersEquity",
    header: "Stockholder Equity",
    cell: ({ row }) => valueToUnit(row.original.stockholdersEquity),
  },
  {
    accessorKey: "price",
    header: "Price (Close)",
    cell: ({ row }) => valueToCurrency(row.original.price),
  },
];
export const reitsAnalysisColumns: ColumnDef<ReitsAnalysis>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      formatDateString(row.original.date, { excludeDay: true }),
  },
  {
    accessorKey: "propertyYield",
    header: "Property Yield",
    cell: ({ row }) => valueToPercent(row.original.propertyYield),
  },
  {
    accessorKey: "costOfDebt",
    header: "Cost of Debt",
    cell: ({ row }) => valueToPercent(row.original.costOfDebt),
  },
  {
    accessorKey: "netProfitGrowRate",
    header: "Net Profit Growth Rate",
    cell: ({ row }) => valueToPercent(row.original.netProfitGrowRate),
  },
  {
    accessorKey: "dividend",
    header: "Dividend",
    cell: ({ row }) => valueToCurrency(row.original.divided),
  },
  {
    accessorKey: "dividendYield",
    header: "Dividend Yield",
    cell: ({ row }) => valueToPercent(row.original.dividendYield),
  },
  {
    accessorKey: "dividendGrowRate",
    header: "Dividend Growth Rate",
    cell: ({ row }) => valueToPercent(row.original.dividendGrowRate),
  },
  {
    accessorKey: "gearing",
    header: "Gearing Ratio (Debt/Assets)",
    cell: ({ row }) => valueToPercent(row.original.gearingRatio),
  },
  {
    accessorKey: "netProfitMargin",
    header: "Net Profit Margin",
    cell: ({ row }) => valueToPercent(row.original.netProfitMargin),
  },
  {
    accessorKey: "priceToBook",
    header: "Price to Book",
    cell: ({ row }) => valueToUnit(row.original.priceToBook),
  },
  {
    accessorKey: "priceToEarning",
    header: "Price to Earning",
    cell: ({ row }) => valueToUnit(row.original.priceToEarning),
  },
];

export type ReitsAnalysis = {
  date: Date;
  propertyYield?: number;
  costOfDebt?: number;
  netProfitGrowRate?: number;
  divided?: number;
  dividendYield?: number;
  dividendGrowRate?: number;
  gearingRatio?: number; //debt / assets
  netProfitMargin?: number;
  priceToBook?: number;
  priceToEarning?: number;
};

export const dividendColumns: ColumnDef<{
  date: Date;
  dividend: number;
}>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) =>
      formatDateString(row.original.date, { excludeDay: true }),
  },
  {
    accessorKey: "dividend",
    header: "Dividend",
    cell: ({ row }) => valueToCurrency(row.original.dividend),
  },
];
