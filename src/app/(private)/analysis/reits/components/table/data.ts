import {
  formatDateString,
  valueToCurrency,
  valueToPercent,
  valueToUnit,
} from "@/lib/format";
import { Currency } from "@/lib/get-currency";
import { FinancialStatement, ReitsKeyMetrics } from "@prisma/client";

export const makeReitsFundamentalTableData = (
  data: FinancialStatement[],
  currency: Currency
) => {
  return data.map((d) => ({
    Date: formatDateString(d.date, { excludeDay: true }),
    "Total Revenue": valueToCurrency(d.revenue, currency),
    Earnings: valueToCurrency(d.netIncome, currency),
    "Operating Cash Flow": valueToCurrency(d.operatingCashFlow, currency),
    "Free Cash Flow": valueToCurrency(d.freeCashFlow, currency),
    "Total Assets": valueToCurrency(d.totalAssets, currency),
    "Non Current Assets": valueToCurrency(d.totalNonCurrentAssets, currency),
    "Property Plant Equipment Net": valueToCurrency(
      d.propertyPlantEquipmentNet,
      currency
    ),
    "Total Liabilities": valueToCurrency(d.totalLiabilities, currency),
    "Current Debt": valueToCurrency(d.shortTermDebt, currency),
    "Long Term Debt": valueToCurrency(d.longTermDebt, currency),
    "Total Debt": valueToCurrency(d.totalDebt, currency),
    "Interest Expense": valueToCurrency(d.interestExpense, currency),
    "Total Equity": valueToCurrency(d.totalEquity, currency),
    "Share Outstanding": valueToUnit(d.weightedAverageShsOut),
  }));
};

export type ReitsFundamentalTableData = ReturnType<
  typeof makeReitsFundamentalTableData
>[number];

export const makeReitsKeymetricsTableData = (
  data: ReitsKeyMetrics[],
  currency: Currency
) => {
  return data.map((d) => ({
    Date: formatDateString(d.date, { excludeDay: true }),
    Price: valueToCurrency(d.price, currency),
    "Property Yield": valueToPercent(d.propertyYield),
    "Cost of Debt": valueToPercent(d.costOfDebt),
    "Yield Spread": valueToPercent(d.yieldSpread),
    "Revenue Growth": valueToPercent(d.revenueGrowth),
    "Net Profit Growth": valueToPercent(d.netProfitGrowth),
    "Net Profit Margin": valueToPercent(d.netProfitMargin),
    Dividend: valueToCurrency(d.dividend, currency),
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
