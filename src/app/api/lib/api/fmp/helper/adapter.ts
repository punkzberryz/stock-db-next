import {
  FinancialGrowthRate,
  FinancialStatement,
  ReitsKeyMetrics,
} from "@prisma/client";
import {
  FmpBalanceSheet,
  FmpCashFlow,
  FmpIncomeStatement,
  FmpKeyMetrics,
} from "../repository/financials";
import { AverageFinancialGrowthRate } from "../fmp-api";

export function makeFinancialFromFmp(
  balanceSheet: FmpBalanceSheet,
  cashflow: FmpCashFlow,
  incomeStatement: FmpIncomeStatement,
  keyMetrics: FmpKeyMetrics
): FinancialStatement {
  const now = new Date();
  return {
    date: new Date(balanceSheet.date),
    symbol: balanceSheet.symbol,
    longTermDebt: balanceSheet.longTermDebt,
    propertyPlantEquipmentNet: balanceSheet.propertyPlantEquipmentNet,
    shortTermDebt: balanceSheet.shortTermDebt,
    totalAssets: balanceSheet.totalAssets,
    totalDebt: balanceSheet.totalDebt,
    totalEquity: balanceSheet.totalEquity,
    totalLiabilities: balanceSheet.totalLiabilities,
    totalNonCurrentAssets: balanceSheet.totalNonCurrentAssets,
    cashAndShortTermInvestments: balanceSheet.cashAndShortTermInvestments,
    freeCashFlow: cashflow.freeCashFlow,
    operatingCashFlow: cashflow.operatingCashFlow,
    interestExpense: incomeStatement.interestExpense,
    netIncome: incomeStatement.netIncome,
    revenue: incomeStatement.revenue,
    weightedAverageShsOut: incomeStatement.weightedAverageShsOut,
    ebitda: incomeStatement.ebitda,
    bookValuePerShare: keyMetrics.bookValuePerShare,
    dividendYield: keyMetrics.dividendYield,
    enterpriseValue: keyMetrics.enterpriseValue,
    investedCapital: keyMetrics.investedCapital,
    marketCap: keyMetrics.marketCap,
    payoutRatio: keyMetrics.payoutRatio,
    pbRatio: keyMetrics.pbRatio,
    peRatio: keyMetrics.peRatio,
    pfcfRatio: keyMetrics.pfcfRatio,
    priceToSalesRatio: keyMetrics.priceToSalesRatio,
    createdAt: now,
    updatedAt: now,
  };
}

export function makeReitsKeyMetricsFromFmp(
  financial: FinancialStatement,
  keyMetrics: FmpKeyMetrics,
  previousFinancial?: FinancialStatement,
  previousKeyMetrics?: FmpKeyMetrics
): ReitsKeyMetrics {
  const price = keyMetrics.marketCap / financial.weightedAverageShsOut;
  const propertyYield = financial.netIncome / financial.totalNonCurrentAssets;
  // debt can be 0
  const costOfDebt =
    financial.totalDebt === 0
      ? 0
      : financial.interestExpense / financial.totalDebt;
  const hasPreviousFinancial = previousFinancial !== undefined;
  const revenueGrowth = hasPreviousFinancial
    ? (financial.revenue - previousFinancial.revenue) /
      Math.abs(previousFinancial.revenue)
    : null;
  const netProfitGrowth = hasPreviousFinancial
    ? (financial.netIncome - previousFinancial.netIncome) /
      Math.abs(previousFinancial.netIncome)
    : null;
  const dividend = keyMetrics.dividendYield * price;
  const hasPreviousKeyMetrics = previousKeyMetrics !== undefined;
  const previousPrice =
    hasPreviousKeyMetrics && hasPreviousFinancial
      ? previousKeyMetrics.marketCap / previousFinancial.weightedAverageShsOut
      : null;
  const previousDividend =
    previousPrice && previousKeyMetrics
      ? previousKeyMetrics.dividendYield * previousPrice
      : null;
  const dividendGrowth = previousDividend
    ? (dividend - previousDividend) / Math.abs(previousDividend)
    : null;
  const previousPriceToBook = hasPreviousKeyMetrics
    ? previousKeyMetrics.pbRatio
    : null;
  const priceToBookGrowth = previousPriceToBook
    ? (keyMetrics.pbRatio - previousPriceToBook) / Math.abs(previousPriceToBook)
    : null;
  const bookValuePerShare = keyMetrics.bookValuePerShare;
  const previousBookValuePerShare = previousKeyMetrics?.bookValuePerShare;
  const bookValuePerShareGrowth = previousBookValuePerShare
    ? (bookValuePerShare - previousBookValuePerShare) /
      Math.abs(previousBookValuePerShare)
    : null;

  return {
    date: new Date(keyMetrics.date),
    price,
    propertyYield,
    costOfDebt,
    yieldSpread: propertyYield - costOfDebt,
    revenueGrowth,
    netProfitGrowth,
    dividend,
    dividendYield: keyMetrics.dividendYield,
    dividendGrowth,
    gearingRatio: financial.totalDebt / financial.totalAssets,
    netProfitMargin: financial.netIncome / financial.revenue,
    priceToBook: keyMetrics.pbRatio,
    priceToBookGrowth,
    priceToEarning: keyMetrics.peRatio,
    bookValuePerShare,
    bookValuePerShareGrowth,
    createdAt: new Date(),
    updatedAt: new Date(),
    symbol: keyMetrics.symbol,
  };
}

export function makeAverageGrowthFromFmp(
  growths: FinancialGrowthRate[],
  numberOfYears: number
): AverageFinancialGrowthRate {
  const avgGrowth = growths.slice(-numberOfYears).reduce(
    (acc, current, index) => {
      let revenueGrowth = acc.revenueGrowth + current.revenueGrowth;
      let ebitgrowth = acc.ebitgrowth + current.ebitgrowth;
      let freeCashFlowGrowth =
        acc.freeCashFlowGrowth + current.freeCashFlowGrowth;
      let epsgrowth = acc.epsgrowth + current.epsgrowth;
      if (index === numberOfYears - 1) {
        revenueGrowth = revenueGrowth / numberOfYears;
        ebitgrowth = ebitgrowth / numberOfYears;
        freeCashFlowGrowth = freeCashFlowGrowth / numberOfYears;
        epsgrowth = epsgrowth / numberOfYears;
      }
      return {
        revenueGrowth,
        ebitgrowth,
        freeCashFlowGrowth,
        epsgrowth,
      };
    },
    {
      revenueGrowth: 0,
      ebitgrowth: 0,
      freeCashFlowGrowth: 0,
      epsgrowth: 0,
    }
  );
  return {
    ...avgGrowth,
    numberOfYears,
  };
}
