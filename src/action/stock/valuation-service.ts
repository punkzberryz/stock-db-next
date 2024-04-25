//Service layer for stock valuation
import { makeAverageGrowthFromFmp } from "@/app/api/lib/api/fmp/helper/adapter";
import { calculateIntrinsicValue } from "@/lib/stock/valuation";
import {
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
} from "@prisma/client";

export const calculateAverageGrowthRate = (growths: FinancialGrowthRate[]) => {
  const results = [makeAverageGrowthFromFmp(growths, 3)];
  if (growths.length >= 5) {
    results.push(makeAverageGrowthFromFmp(growths, 5));
  }

  return results;
};

export const getValuation = (
  {
    financials,
    growths,
    ratios,
  }: {
    financials: FinancialStatement[];
    growths: FinancialGrowthRate[];
    ratios: FinancialRatio[];
  },
  {
    numberOfGrowthRateYears,
  }: {
    numberOfGrowthRateYears: number;
  } = { numberOfGrowthRateYears: 3 }
) => {
  // get average growth rate over 3 or 5 years
  const avgGrowth = makeAverageGrowthFromFmp(growths, numberOfGrowthRateYears);

  //We opt out free cash flow growth for now, and we use 90% of the lowest growth rate
  const defaultGrowthRateAssumption =
    Math.min(
      avgGrowth.ebitgrowth,
      avgGrowth.revenueGrowth,
      // avgGrowth.freeCashFlowGrowth,
      avgGrowth.epsgrowth
    ) * 0.9;
  const latestFinancial = financials[financials.length - 1];
  const averagePriceToFcf =
    ratios.reduce((acc, r) => acc + r.priceToFreeCashFlowsRatio, 0) /
    ratios.length;
  const defaultParams = {
    cashAndShortTermInvestments: latestFinancial.cashAndShortTermInvestments,
    discountRate: DEFAULT_DCF_DISCOUNT_RATE,
    growthRateAssumption: defaultGrowthRateAssumption,
    latestFreeCashFlow: latestFinancial.freeCashFlow,
    shareOutstanding: latestFinancial.weightedAverageShsOut,
    terminalPriceToFCF: averagePriceToFcf,
    totalLiabilities: latestFinancial.totalLiabilities,
  };
  const intrinsicValue = calculateIntrinsicValue(defaultParams);
  return {
    intrinsicValue,
    defaultParams,
  };
};
const DEFAULT_DCF_DISCOUNT_RATE = 0.12;
