import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import { FMP_URL } from "../config";

export class FmpApiFinancial {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
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
      const data = (await resp.json()) as IncomeStatement[];
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
      const data = (await resp.json()) as BalanceSheet[];
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
      const data = (await resp.json()) as CashFlow[];
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
      const data = (await resp.json()) as KeyMetrics[];
      //date is decs, we reverse to acs
      data.reverse();
      return data;
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial - getKeyMetrics", err);
    }
  }
}

type IncomeStatement = {
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
type BalanceSheet = {
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
type CashFlow = {
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
type KeyMetrics = {
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
