"use client";

import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import {
  valueToCurrency,
  valueToUnit,
  formatDateString,
  valueToPercent,
} from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";

type Fundamental = Awaited<
  ReturnType<typeof fmpApi.getReitsKeyMetrics>
>["financials"][number];
type KeyMetrics = Awaited<
  ReturnType<typeof fmpApi.getReitsKeyMetrics>
>["reitsKeyMetrics"][number];

interface HeaderCellProps {
  title: string;
}
const HeaderCell = ({ title }: HeaderCellProps) => {
  return <p className="w-[150px] truncate">{title}</p>;
};
const CellWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <div className="w-[100px] text-center">{children}</div>;
};

export const fundamentalColumns: ColumnDef<Fundamental>[] = [
  {
    accessorKey: "date",
    header: () => <HeaderCell title="Date" />,
    cell: ({ row }) => (
      <CellWrapper>
        {formatDateString(row.original.date, { excludeDay: true })}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "revenue",
    header: () => <HeaderCell title="Total Revenue" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.revenue)}</CellWrapper>
    ),
  },
  {
    accessorKey: "netIncome",
    header: () => <HeaderCell title="Earnings" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.netIncome)}</CellWrapper>
    ),
  },
  {
    accessorKey: "operatingCashFlow",
    header: () => <HeaderCell title="Operating Cash Flow" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToCurrency(row.original.operatingCashFlow)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "freeCashFlow",
    header: () => <HeaderCell title="Free Cash Flow" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.freeCashFlow)}</CellWrapper>
    ),
  },
  {
    accessorKey: "totalAssets",
    header: () => <HeaderCell title="Total Assets" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.totalAssets)}</CellWrapper>
    ),
  },
  {
    accessorKey: "nonCurrentAssets",
    header: () => <HeaderCell title="Non Current Assets" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToCurrency(row.original.totalNonCurrentAssets)}
      </CellWrapper>
    ),
  },

  {
    accessorKey: "propertyPlantEquipmentNet",
    header: () => <HeaderCell title="Property Plant Equipment Net" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToCurrency(row.original.propertyPlantEquipmentNet)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "totalLiabilities",
    header: () => <HeaderCell title="Total Liabilities" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToCurrency(row.original.totalLiabilities)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "currentDebt",
    header: () => <HeaderCell title="Short Term Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.shortTermDebt)}</CellWrapper>
    ),
  },
  {
    accessorKey: "longTermDebt",
    header: () => <HeaderCell title="Long Term Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.longTermDebt)}</CellWrapper>
    ),
  },
  {
    accessorKey: "totalDebt",
    header: () => <HeaderCell title="Total Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.totalDebt)}</CellWrapper>
    ),
  },
  {
    accessorKey: "interestExpense",
    header: () => <HeaderCell title="Interest Expense (cost of debt)" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.interestExpense)}</CellWrapper>
    ),
  },
  {
    accessorKey: "totalEquity",
    header: () => <HeaderCell title="Total Equity" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.totalEquity)}</CellWrapper>
    ),
  },
  {
    accessorKey: "shareOutstanding",
    header: () => <HeaderCell title="Share Outstanding" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.weightedAverageShsOut)}
      </CellWrapper>
    ),
  },
];
export const keyMetricsColumns: ColumnDef<KeyMetrics>[] = [
  {
    accessorKey: "date",
    header: () => <HeaderCell title="Date" />,
    cell: ({ row }) => (
      <CellWrapper>
        {formatDateString(row.original.date, { excludeDay: true })}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "price",
    header: () => <HeaderCell title="Price" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.price)}</CellWrapper>
    ),
  },
  {
    accessorKey: "propertyYield",
    header: () => <HeaderCell title="Property Yield" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.propertyYield)}</CellWrapper>
    ),
  },
  {
    accessorKey: "costOfDebt",
    header: () => <HeaderCell title="Cost of Debt" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.costOfDebt)}</CellWrapper>
    ),
  },
  {
    accessorKey: "yieldSpread",
    header: () => <HeaderCell title="Yield Spread" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.yieldSpread)}</CellWrapper>
    ),
  },
  {
    accessorKey: "revenueGrowth",
    header: () => <HeaderCell title="Revenue Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.revenueGrowth)}</CellWrapper>
    ),
  },
  {
    accessorKey: "netProfitGrowth",
    header: () => <HeaderCell title="Net Profit Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.netProfitGrowth)}</CellWrapper>
    ),
  },
  {
    accessorKey: "netProfitMargin",
    header: () => <HeaderCell title="Net Profit Margin" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.netProfitMargin)}</CellWrapper>
    ),
  },
  {
    accessorKey: "dividend",
    header: () => <HeaderCell title="Dividend" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToCurrency(row.original.dividend)}</CellWrapper>
    ),
  },
  {
    accessorKey: "dividendYield",
    header: () => <HeaderCell title="Dividend Yield" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.dividendYield)}</CellWrapper>
    ),
  },
  {
    accessorKey: "dividendGrowth",
    header: () => <HeaderCell title="Dividend Growth" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.dividendGrowth)}</CellWrapper>
    ),
  },
  {
    accessorKey: "gearingRatio",
    header: () => <HeaderCell title="Gearing Ratio (Debt/Assets)" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToPercent(row.original.gearingRatio)}</CellWrapper>
    ),
  },
  {
    accessorKey: "priceToBook",
    header: () => <HeaderCell title="Price to Book" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToUnit(row.original.priceToBook)}</CellWrapper>
    ),
  },
  {
    accessorKey: "priceToEarning",
    header: () => <HeaderCell title="Price to Earning" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToUnit(row.original.priceToEarning)}</CellWrapper>
    ),
  },
  {
    accessorKey: "priceToBookGrowth",
    header: () => <HeaderCell title="Price to Book Growth" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToPercent(row.original.priceToBookGrowth)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "bookValuePerShare",
    header: () => <HeaderCell title="Book Value Per Share" />,
    cell: ({ row }) => (
      <CellWrapper>{valueToUnit(row.original.bookValuePerShare)}</CellWrapper>
    ),
  },
  {
    accessorKey: "bookValuePerShareGrowth",
    header: () => <HeaderCell title="Book Value Per Share Growth" />,
    cell: ({ row }) => (
      <CellWrapper>
        {valueToPercent(row.original.bookValuePerShareGrowth)}
      </CellWrapper>
    ),
  },
];
