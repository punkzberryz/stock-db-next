import { FmpApiDividend } from "./repository/dividend";
import { FmpApiFinancial } from "./repository/financials";
import { FmpApiCompanyInfo } from "./repository/company-info";
import { FinancialStatement, ReitsKeyMetrics } from "@prisma/client";
import {
  makeFinancialFromFmp,
  makeReitsKeyMetricsFromFmp,
} from "./helper/adapter";

class FmpApi {
  constructor(
    private companyInfo: FmpApiCompanyInfo,
    private financial: FmpApiFinancial,
    private dividend: FmpApiDividend
  ) {}

  getProfile(symbol: string) {
    return this.companyInfo.getProfile(symbol);
  }
  getDividends(symbol: string) {
    return this.dividend.getDividends(symbol);
  }

  async getFinancialStatements(symbol: string) {
    return this.financial.getFinancialStatements(symbol, { period: "annual" });
  }
  async getGrowthMetrics(symbol: string) {
    return this.financial.getFinancialGrowth(symbol, { period: "annual" });
  }
  async getFinancialRatios(symbol: string) {
    return this.financial.getFinancialRatios(symbol, { period: "annual" });
  }

  async getKeyMetrics(symbol: string) {
    return this.financial.getKeyMetrics(symbol, { period: "annual" });
  }

  async getReitsKeyMetricsAndFinancials(symbol: string): Promise<{
    financials: FinancialStatement[];
    reitsKeyMetrics: ReitsKeyMetrics[];
  }> {
    const [balanceSheets, cashflows, incomeStatements, keyMetrics] =
      await Promise.all([
        this.financial.getBalanceSheets(symbol),
        this.financial.getCashflows(symbol),
        this.financial.getIncomeStatements(symbol),
        this.financial.getKeyMetrics(symbol),
      ]);
    const financials: FinancialStatement[] = [];
    const reitsKeyMetrics: ReitsKeyMetrics[] = [];

    balanceSheets.forEach((_, index) => {
      //we can assume that they share the same length
      const financial = makeFinancialFromFmp(
        balanceSheets[index],
        cashflows[index],
        incomeStatements[index],
        keyMetrics[index]
      );
      financials.push(financial);
      const previousFinancial = index === 0 ? undefined : financials[index - 1];
      const previousKeyMetrics =
        index === 0 ? undefined : keyMetrics[index - 1];

      const reitsKeyMetricsItem = makeReitsKeyMetricsFromFmp(
        financial,
        keyMetrics[index],
        previousFinancial,
        previousKeyMetrics
      );
      reitsKeyMetrics.push(reitsKeyMetricsItem);
    });

    //Combine two data-table into one

    return {
      financials,
      reitsKeyMetrics,
    };
  }
}

const apiKey = process.env.FMP_API_KEY ?? "invalid";
export const fmpApi = new FmpApi(
  new FmpApiCompanyInfo(apiKey),
  new FmpApiFinancial(apiKey),
  new FmpApiDividend(apiKey)
);

export type AverageFinancialGrowthRate = {
  numberOfYears: number;
  revenueGrowth: number;
  ebitgrowth: number;
  freeCashFlowGrowth: number;
  epsgrowth: number;
};
