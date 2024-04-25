import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import { FMP_URL } from "../config";
import {
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
} from "@prisma/client";
import { makeFinancialFromFmp } from "../helper/adapter";

export class FmpApiFinancial {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async getFinancialStatements(
    symbol: string,
    {
      period,
    }: {
      period?: "annual" | "quarter";
    } = { period: "annual" }
  ): Promise<FinancialStatement[]> {
    try {
      const [balanceSheets, cashflows, incomeStatements, keyMetrics] =
        await Promise.all([
          this.getBalanceSheets(symbol, { period }),
          this.getCashflows(symbol, { period }),
          this.getIncomeStatements(symbol, { period }),
          this.getKeyMetrics(symbol, { period }),
        ]);
      const financials: FinancialStatement[] = [];
      balanceSheets.forEach((balanceSheet, index) => {
        financials.push(
          makeFinancialFromFmp(
            balanceSheet,
            cashflows[index],
            incomeStatements[index],
            keyMetrics[index]
          )
        );
      });
      return financials;
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getFinancialStatements", err);
    }
  }
  async getIncomeStatements(
    symbol: string,
    {
      period,
    }: {
      period?: "annual" | "quarter";
    } = { period: "annual" }
  ) {
    try {
      const resp = await fetch(
        `${FMP_URL}/income-statement/${symbol.toLowerCase()}?period=${period}&apikey=${
          this.apiKey
        }`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpIncomeStatement[];
      //date is decs, we reverse to acs
      data.reverse();
      return data;
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getIncomeStatements", err);
    }
  }
  async getBalanceSheets(
    symbol: string,
    {
      period,
    }: {
      period?: "annual" | "quarter";
    } = { period: "annual" }
  ) {
    try {
      const resp = await fetch(
        `${FMP_URL}/balance-sheet-statement/${symbol.toLowerCase()}?period=${period}&apikey=${
          this.apiKey
        }`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpBalanceSheet[];
      //date is decs, we reverse to acs
      data.reverse();
      return data;
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getBalanceSheets", err);
    }
  }
  async getCashflows(
    symbol: string,
    {
      period,
    }: {
      period?: "annual" | "quarter";
    } = { period: "annual" }
  ) {
    try {
      const resp = await fetch(
        `${FMP_URL}/cash-flow-statement/${symbol.toLowerCase()}?period=${period}&apikey=${
          this.apiKey
        }`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpCashFlow[];
      //date is decs, we reverse to acs
      data.reverse();
      return data;
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getCashflows", err);
    }
  }
  async getKeyMetrics(
    symbol: string,
    {
      period,
      limit,
    }: {
      period?: "annual" | "quarter";
      limit?: number;
    } = { period: "annual" }
  ) {
    try {
      const resp = await fetch(
        `${FMP_URL}/key-metrics/${symbol.toLowerCase()}?period=${period}&apikey=${
          this.apiKey
        }&limit=${limit}`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpKeyMetrics[];
      //date is decs, we reverse to acs
      data.reverse();
      return data;
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getKeyMetrics", err);
    }
  }
  async getFinancialGrowth(
    symbol: string,
    {
      period,
      limit,
    }: {
      period?: "annual" | "quarter";
      limit?: number;
    } = { period: "annual" }
  ): Promise<FinancialGrowthRate[]> {
    try {
      const resp = await fetch(
        `${FMP_URL}/financial-growth/${symbol}?period=${period}&apikey=${this.apiKey}&limit=${limit}`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpFinancialGrowth[];
      //date is decs, we reverse to acs
      data.reverse();

      return data.map((d) => ({
        symbol: d.symbol,
        dividendsperShareGrowth: d.dividendsperShareGrowth,
        ebitgrowth: d.ebitgrowth,
        epsgrowth: d.epsgrowth,
        freeCashFlowGrowth: d.freeCashFlowGrowth,
        grossProfitGrowth: d.grossProfitGrowth,
        netIncomeGrowth: d.netIncomeGrowth,
        operatingCashFlowGrowth: d.operatingCashFlowGrowth,
        revenueGrowth: d.revenueGrowth,
        date: new Date(d.date),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getFinancialGrowth", err);
    }
  }
  async getFinancialRatios(
    symbol: string,
    {
      period,
      limit,
    }: {
      period?: "annual" | "quarter";
      limit?: number;
    } = { period: "annual" }
  ): Promise<FinancialRatio[]> {
    try {
      const resp = await fetch(
        `${FMP_URL}/ratios/${symbol}?period=${period}&apikey=${this.apiKey}&limit=${limit}`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpFinancialRatios[];
      //date is decs, we reverse to acs
      data.reverse();
      return data.map((d) => ({
        date: new Date(d.date),
        createdAt: new Date(),
        updatedAt: new Date(),
        debtEquityRatio: d.debtEquityRatio,
        dividendYield: d.dividendYield,
        enterpriseValueMultiple: d.enterpriseValueMultiple,
        freeCashFlowPerShare: d.freeCashFlowPerShare,
        netProfitMargin: d.netProfitMargin,
        priceBookValueRatio: d.priceBookValueRatio,
        priceEarningsRatio: d.priceEarningsRatio,
        priceFairValue: d.priceFairValue,
        priceToBookRatio: d.priceToBookRatio,
        priceToFreeCashFlowsRatio: d.priceToFreeCashFlowsRatio,
        priceToSalesRatio: d.priceToSalesRatio,
        returnOnEquity: d.returnOnEquity,
        symbol: d.symbol,
      }));
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getFinancialRatio", err);
    }
  }
}

export type FmpIncomeStatement = {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  fillingDate: string;
  acceptedDate: string;
  calendarYear: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  grossProfitRatio: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebitdaratio: number;
  operatingIncome: number;
  operatingIncomeRatio: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeBeforeTaxRatio: number;
  incomeTaxExpense: number;
  netIncome: number;
  netIncomeRatio: number;
  eps: number;
  epsdiluted: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
  link: string;
  finalLink: string;
};
export type FmpBalanceSheet = {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  fillingDate: string;
  acceptedDate: string;
  calendarYear: string;
  period: string;
  cashAndCashEquivalents: number;
  shortTermInvestments: number;
  cashAndShortTermInvestments: number;
  netReceivables: number;
  inventory: number;
  otherCurrentAssets: number;
  totalCurrentAssets: number;
  propertyPlantEquipmentNet: number;
  goodwill: number;
  intangibleAssets: number;
  goodwillAndIntangibleAssets: number;
  longTermInvestments: number;
  taxAssets: number;
  otherNonCurrentAssets: number;
  totalNonCurrentAssets: number;
  otherAssets: number;
  totalAssets: number;
  accountPayables: number;
  shortTermDebt: number;
  taxPayables: number;
  deferredRevenue: number;
  otherCurrentLiabilities: number;
  totalCurrentLiabilities: number;
  longTermDebt: number;
  deferredRevenueNonCurrent: number;
  deferredTaxLiabilitiesNonCurrent: number;
  otherNonCurrentLiabilities: number;
  totalNonCurrentLiabilities: number;
  otherLiabilities: number;
  capitalLeaseObligations: number;
  totalLiabilities: number;
  preferredStock: number;
  commonStock: number;
  retainedEarnings: number;
  accumulatedOtherComprehensiveIncomeLoss: number;
  othertotalStockholdersEquity: number;
  totalStockholdersEquity: number;
  totalEquity: number;
  totalLiabilitiesAndStockholdersEquity: number;
  minorityInterest: number;
  totalLiabilitiesAndTotalEquity: number;
  totalInvestments: number;
  totalDebt: number;
  netDebt: number;
  link: string;
  finalLink: string;
};
export type FmpCashFlow = {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  fillingDate: string;
  acceptedDate: string;
  calendarYear: string;
  period: string;
  netIncome: number;
  depreciationAndAmortization: number;
  deferredIncomeTax: number;
  stockBasedCompensation: number;
  changeInWorkingCapital: number;
  accountsReceivables: number;
  inventory: number;
  accountsPayables: number;
  otherWorkingCapital: number;
  otherNonCashItems: number;
  netCashProvidedByOperatingActivities: number;
  investmentsInPropertyPlantAndEquipment: number;
  acquisitionsNet: number;
  purchasesOfInvestments: number;
  salesMaturitiesOfInvestments: number;
  otherInvestingActivites: number;
  netCashUsedForInvestingActivites: number;
  debtRepayment: number;
  commonStockIssued: number;
  commonStockRepurchased: number;
  dividendsPaid: number;
  otherFinancingActivites: number;
  netCashUsedProvidedByFinancingActivities: number;
  effectOfForexChangesOnCash: number;
  netChangeInCash: number;
  cashAtEndOfPeriod: number;
  cashAtBeginningOfPeriod: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  link: string;
  finalLink: string;
};
export type FmpKeyMetrics = {
  symbol: string;
  date: string;
  calendarYear: string;
  period: string;
  revenuePerShare: number;
  netIncomePerShare: number;
  operatingCashFlowPerShare: number;
  freeCashFlowPerShare: number;
  cashPerShare: number;
  bookValuePerShare: number;
  tangibleBookValuePerShare: number;
  shareholdersEquityPerShare: number;
  interestDebtPerShare: number;
  marketCap: number;
  enterpriseValue: number;
  peRatio: number;
  priceToSalesRatio: number;
  pocfratio: number;
  pfcfRatio: number;
  pbRatio: number;
  ptbRatio: number;
  evToSales: number;
  enterpriseValueOverEBITDA: number;
  evToOperatingCashFlow: number;
  evToFreeCashFlow: number;
  earningsYield: number;
  freeCashFlowYield: number;
  debtToEquity: number;
  debtToAssets: number;
  netDebtToEBITDA: number;
  currentRatio: number;
  interestCoverage: number;
  incomeQuality: number;
  dividendYield: number;
  payoutRatio: number;
  salesGeneralAndAdministrativeToRevenue: number;
  researchAndDdevelopementToRevenue: number;
  intangiblesToTotalAssets: number;
  capexToOperatingCashFlow: number;
  capexToRevenue: number;
  capexToDepreciation: number;
  stockBasedCompensationToRevenue: number;
  grahamNumber: number;
  roic: number;
  returnOnTangibleAssets: number;
  grahamNetNet: number;
  workingCapital: number;
  tangibleAssetValue: number;
  netCurrentAssetValue: number;
  investedCapital: number;
  averageReceivables: number;
  averagePayables: number;
  averageInventory: number;
  daysSalesOutstanding: number;
  daysPayablesOutstanding: number;
  daysOfInventoryOnHand: number;
  receivablesTurnover: number;
  payablesTurnover: number;
  inventoryTurnover: number;
  roe: number;
  capexPerShare: number;
};
export type FmpFinancialGrowth = {
  symbol: string;
  date: string;
  calendarYear: string;
  period: string;
  revenueGrowth: number;
  grossProfitGrowth: number;
  ebitgrowth: number;
  operatingIncomeGrowth: number;
  netIncomeGrowth: number;
  epsgrowth: number;
  epsdilutedGrowth: number;
  weightedAverageSharesGrowth: number;
  weightedAverageSharesDilutedGrowth: number;
  dividendsperShareGrowth: number;
  operatingCashFlowGrowth: number;
  freeCashFlowGrowth: number;
  tenYRevenueGrowthPerShare: number;
  fiveYRevenueGrowthPerShare: number;
  threeYRevenueGrowthPerShare: number;
  tenYOperatingCFGrowthPerShare: number;
  fiveYOperatingCFGrowthPerShare: number;
  threeYOperatingCFGrowthPerShare: number;
  tenYNetIncomeGrowthPerShare: number;
  fiveYNetIncomeGrowthPerShare: number;
  threeYNetIncomeGrowthPerShare: number;
  tenYShareholdersEquityGrowthPerShare: number;
  fiveYShareholdersEquityGrowthPerShare: number;
  threeYShareholdersEquityGrowthPerShare: number;
  tenYDividendperShareGrowthPerShare: number;
  fiveYDividendperShareGrowthPerShare: number;
  threeYDividendperShareGrowthPerShare: number;
  receivablesGrowth: number;
  inventoryGrowth: number;
  assetGrowth: number;
  bookValueperShareGrowth: number;
  debtGrowth: number;
  rdexpenseGrowth: number;
  sgaexpensesGrowth: number;
};

export type FmpFinancialRatios = {
  symbol: string;
  date: string;
  calendarYear: string;
  period: string;
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  daysOfSalesOutstanding: number;
  daysOfInventoryOutstanding: number;
  operatingCycle: number;
  daysOfPayablesOutstanding: number;
  cashConversionCycle: number;
  grossProfitMargin: number;
  operatingProfitMargin: number;
  pretaxProfitMargin: number;
  netProfitMargin: number;
  effectiveTaxRate: number;
  returnOnAssets: number;
  returnOnEquity: number;
  returnOnCapitalEmployed: number;
  netIncomePerEBT: number;
  ebtPerEbit: number;
  ebitPerRevenue: number;
  debtRatio: number;
  debtEquityRatio: number;
  longTermDebtToCapitalization: number;
  totalDebtToCapitalization: number;
  interestCoverage: number;
  cashFlowToDebtRatio: number;
  companyEquityMultiplier: number;
  receivablesTurnover: number;
  payablesTurnover: number;
  inventoryTurnover: number;
  fixedAssetTurnover: number;
  assetTurnover: number;
  operatingCashFlowPerShare: number;
  freeCashFlowPerShare: number;
  cashPerShare: number;
  payoutRatio: number;
  operatingCashFlowSalesRatio: number;
  freeCashFlowOperatingCashFlowRatio: number;
  cashFlowCoverageRatios: number;
  shortTermCoverageRatios: number;
  capitalExpenditureCoverageRatio: number;
  dividendPaidAndCapexCoverageRatio: number;
  dividendPayoutRatio: number;
  priceBookValueRatio: number;
  priceToBookRatio: number;
  priceToSalesRatio: number;
  priceEarningsRatio: number;
  priceToFreeCashFlowsRatio: number;
  priceToOperatingCashFlowsRatio: number;
  priceCashFlowRatio: number;
  priceEarningsToGrowthRatio: number;
  priceSalesRatio: number;
  dividendYield: number;
  enterpriseValueMultiple: number;
  priceFairValue: number;
};
