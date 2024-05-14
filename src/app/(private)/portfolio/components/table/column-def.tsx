import { ColumnDef } from "@tanstack/react-table";
import { PortfolioRowData } from "./format-data";

export const portfolioColumns: ColumnDef<PortfolioRowData>[] = [
  {
    accessorKey: "Ticker",
    header: "Ticker",
  },
  {
    accessorKey: "Price",
    header: "Price",
  },
  {
    accessorKey: "Shares",
    header: "Shares",
  },
  {
    accessorKey: "Cost",
    header: "Cost",
  },
  {
    accessorKey: "CostPerShare",
    header: "Cost Per Share",
  },
  {
    accessorKey: "UnrealizedGain",
    header: "Unrealized Gain/Loss",
  },
  {
    accessorKey: "UnrealizedGainRatio",
    header: "Unrealized Gain/Loss %",
  },
  {
    accessorKey: "RealizedGain",
    header: "Realized Gain/Loss",
  },
  {
    accessorKey: "DividendsCollected",
    header: "Dividends Collected",
  },
  {
    accessorKey: "TotalGain",
    header: "Total Gain/Loss",
  },
  {
    accessorKey: "MarketValue",
    header: "Market Value",
  },
];
