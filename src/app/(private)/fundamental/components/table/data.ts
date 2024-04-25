import { Currency } from "@/lib/get-currency";
import { FinancialStatement } from "@prisma/client";
import { formatDateString, valueToCurrency, valueToUnit } from "@/lib/format";

export const makeFundamentalTableData = (
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

export type FundamentalTableData = ReturnType<
  typeof makeFundamentalTableData
>[number];
