import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import {
  formatDateString,
  valueToCurrency,
  valueToPercent,
  valueToUnit,
} from "@/lib/format";

type Fundamental = Awaited<
  ReturnType<typeof fmpApi.getReitsKeyMetrics>
>["financials"][number];

export const makeReitsFundamentalTableData = (data: Fundamental[]) => {
  return data.map((d) => ({
    Date: formatDateString(d.date, { excludeDay: true }),
    "Total Revenue": valueToCurrency(d.revenue),
    Earnings: valueToCurrency(d.netIncome),
    "Operating Cash Flow": valueToCurrency(d.operatingCashFlow),
    "Free Cash Flow": valueToCurrency(d.freeCashFlow),
    "Total Assets": valueToCurrency(d.totalAssets),
    "Non Current Assets": valueToCurrency(d.totalNonCurrentAssets),
    "Property Plant Equipment Net": valueToCurrency(
      d.propertyPlantEquipmentNet
    ),
    "Total Liabilities": valueToCurrency(d.totalLiabilities),
    "Current Debt": valueToCurrency(d.shortTermDebt),
    "Long Term Debt": valueToCurrency(d.longTermDebt),
    "Total Debt": valueToCurrency(d.totalDebt),
    "Interest Expense": valueToCurrency(d.interestExpense),
    "Total Equity": valueToCurrency(d.totalEquity),
    "Share Outstanding": valueToUnit(d.weightedAverageShsOut),
  }));
};

export type ReitsFundamentalTableData = ReturnType<
  typeof makeReitsFundamentalTableData
>[number];

type KeyMetrics = Awaited<
  ReturnType<typeof fmpApi.getReitsKeyMetrics>
>["reitsKeyMetrics"][number];

export const makeReitsKeymetricsTableData = (data: KeyMetrics[]) => {
  return data.map((d) => ({
    Date: formatDateString(d.date, { excludeDay: true }),
    Price: valueToCurrency(d.price),
    "Property Yield": valueToPercent(d.propertyYield),
    "Cost of Debt": valueToPercent(d.costOfDebt),
    "Yield Spread": valueToPercent(d.yieldSpread),
    "Revenue Growth": valueToPercent(d.revenueGrowth),
    "Net Profit Growth": valueToPercent(d.netProfitGrowth),
    "Net Profit Margin": valueToPercent(d.netProfitMargin),
    Dividend: valueToCurrency(d.dividend),
    "Dividend Yield": valueToPercent(d.dividendYield),
    "Dividend Growth": valueToPercent(d.dividendGrowth),
    "Gearing Ratio (Debt/Assets)": valueToPercent(d.gearingRatio),
    "Price to Book": valueToUnit(d.priceToBook),
    "Price to Earning": valueToUnit(d.priceToEarning),
    "Price to Book Growth": valueToPercent(d.priceToBookGrowth),
    "Book Value per Share": valueToUnit(d.bookValuePerShare),
    "Book Value per Share Growth": valueToPercent(d.bookValuePerShareGrowth),
  }));
};

export type ReitsKeyMetricsTableData = ReturnType<
  typeof makeReitsKeymetricsTableData
>[number];
