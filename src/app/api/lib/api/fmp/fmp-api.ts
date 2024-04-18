import { catchErrorHelper } from "@/lib/error";
import { FmpApiDividend } from "./repository/dividend";
import { FmpApiFinancial } from "./repository/financials";
import { FmpApiCompanyInfo } from "./repository/company-info";

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
    try {
      const [balanceSheets, cashflows, incomeStatements] = await Promise.all([
        this.financial.getBalanceSheets(symbol, { period: "annual" }),
        this.financial.getCashflows(symbol),
        this.financial.getIncomeStatements(symbol),
      ]);
      const financials: FmpFinancialStatement[] = [];
      balanceSheets.forEach((_, index) => {
        //we can assume that they share the same length
        financials.push(
          this.makeFinancial(
            balanceSheets[index],
            cashflows[index],
            incomeStatements[index]
          )
        );
      });
      return financials;
    } catch (err) {
      return catchErrorHelper("FmpApi - getFinancialStatements", err);
    }
  }
  async getReitsKeyMetrics(symbol: string) {
    const [balanceSheets, cashflows, incomeStatements, keyMetrics] =
      await Promise.all([
        this.financial.getBalanceSheets(symbol),
        this.financial.getCashflows(symbol),
        this.financial.getIncomeStatements(symbol),
        this.financial.getKeyMetrics(symbol),
      ]);
    const financials: FmpFinancialStatement[] = [];
    const reitsKeyMetrics: FmpReitsKeyMetrics[] = [];

    balanceSheets.forEach((_, index) => {
      //we can assume that they share the same length
      const financial = this.makeFinancial(
        balanceSheets[index],
        cashflows[index],
        incomeStatements[index]
      );
      financials.push(financial);
      const previousFinancial = index === 0 ? undefined : financials[index - 1];
      const previousKeyMetrics =
        index === 0 ? undefined : keyMetrics[index - 1];

      const reitsKeyMetricsItem = this.makeReitsKeyMetrics(
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

  private makeFinancial(
    balanceSheet: Awaited<
      ReturnType<typeof this.financial.getBalanceSheets>
    >[number],
    cashflow: Awaited<ReturnType<typeof this.financial.getCashflows>>[number],
    incomeStatement: Awaited<
      ReturnType<typeof this.financial.getIncomeStatements>
    >[number]
  ): FmpFinancialStatement {
    return {
      date: balanceSheet.date,
      longTermDebt: balanceSheet.longTermDebt,
      propertyPlantEquipmentNet: balanceSheet.propertyPlantEquipmentNet,
      shortTermDebt: balanceSheet.shortTermDebt,
      totalAssets: balanceSheet.totalAssets,
      totalDebt: balanceSheet.totalDebt,
      totalEquity: balanceSheet.totalEquity,
      totalLiabilities: balanceSheet.totalLiabilities,
      totalNonCurrentAssets: balanceSheet.totalNonCurrentAssets,
      freeCashFlow: cashflow.freeCashFlow,
      operatingCashFlow: cashflow.operatingCashFlow,
      interestExpense: incomeStatement.interestExpense,
      netIncome: incomeStatement.netIncome,
      revenue: incomeStatement.revenue,
      weightedAverageShsOut: incomeStatement.weightedAverageShsOut,
    };
  }
  private makeReitsKeyMetrics(
    financial: FmpFinancialStatement,
    keyMetrics: Awaited<
      ReturnType<typeof this.financial.getKeyMetrics>
    >[number],
    previousFinancial?: FmpFinancialStatement,
    previousKeyMetrics?: Awaited<
      ReturnType<typeof this.financial.getKeyMetrics>
    >[number]
  ): FmpReitsKeyMetrics {
    const price = keyMetrics.marketCap / financial.weightedAverageShsOut;
    const propertyYield = financial.netIncome / financial.totalNonCurrentAssets;
    const costOfDebt = financial.interestExpense / financial.totalDebt;
    const hasPreviousFinancial = previousFinancial !== undefined;
    const revenueGrowth = hasPreviousFinancial
      ? (financial.revenue - previousFinancial.revenue) /
        Math.abs(previousFinancial.revenue)
      : undefined;
    const netProfitGrowth = hasPreviousFinancial
      ? (financial.netIncome - previousFinancial.netIncome) /
        Math.abs(previousFinancial.netIncome)
      : undefined;
    const dividend = keyMetrics.dividendYield * price;
    const hasPreviousKeyMetrics = previousKeyMetrics !== undefined;
    const previousPrice =
      hasPreviousKeyMetrics && hasPreviousFinancial
        ? previousKeyMetrics.marketCap / previousFinancial.weightedAverageShsOut
        : undefined;
    const previousDividend =
      previousPrice && previousKeyMetrics
        ? previousKeyMetrics.dividendYield * previousPrice
        : undefined;
    const dividendGrowth = previousDividend
      ? (dividend - previousDividend) / Math.abs(previousDividend)
      : undefined;
    const previousPriceToBook = hasPreviousKeyMetrics
      ? previousKeyMetrics.pbRatio
      : undefined;
    const priceToBookGrowth = previousPriceToBook
      ? (keyMetrics.pbRatio - previousPriceToBook) /
        Math.abs(previousPriceToBook)
      : undefined;
    const bookValuePerShare = keyMetrics.bookValuePerShare;
    const previousBookValuePerShare = previousKeyMetrics?.bookValuePerShare;
    const bookValuePerShareGrowth = previousBookValuePerShare
      ? (bookValuePerShare - previousBookValuePerShare) /
        Math.abs(previousBookValuePerShare)
      : undefined;

    return {
      date: keyMetrics.date,
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
    };
  }
}

const apiKey = process.env.FMP_API_KEY ?? "invalid";
export const fmpApi = new FmpApi(
  new FmpApiCompanyInfo(apiKey),
  new FmpApiFinancial(apiKey),
  new FmpApiDividend(apiKey)
);
export type FmpReitsKeyMetrics = {
  date: string;
  price: number;
  propertyYield: number; //not percent
  costOfDebt: number;
  yieldSpread: number; //propertyYield - costOfDebt
  revenueGrowth: number | undefined;
  netProfitGrowth: number | undefined;
  dividend: number;
  dividendYield: number;
  dividendGrowth: number | undefined;
  gearingRatio: number;
  netProfitMargin: number;
  bookValuePerShare: number;
  bookValuePerShareGrowth: number | undefined;
  priceToBook: number;
  priceToBookGrowth: number | undefined;
  priceToEarning: number;
};

type FmpFinancialStatement = {
  date: string; //"2023-12-31"

  // Income Statement
  revenue: number;
  netIncome: number;
  interestExpense: number;
  weightedAverageShsOut: number;
  // Balance Sheet

  totalAssets: number;
  totalNonCurrentAssets: number;
  propertyPlantEquipmentNet: number;
  totalLiabilities: number;
  shortTermDebt: number;
  longTermDebt: number;
  totalDebt: number;
  totalEquity: number;
  // Cashflow
  operatingCashFlow: number;
  freeCashFlow: number;
};
