export type YahooFundamentalResponse = {
  date: Date;
  // Income Statement
  totalRevenue?: number;
  netIncome?: number;
  EBITDA?: number;
  dilutedEPS?: number;
  interestExpense?: number;
  // Balance Sheet
  totalAssets?: number;
  currentAssets?: number;
  totalNonCurrentAssets?: number;
  investmentProperties?: number;
  cashFinancial?: number;
  totalLiabilitiesNetMinorityInterest?: number;
  currentDebt?: number;
  longTermDebt?: number;
  commonStockEquity?: number;
  stockholdersEquity?: number;
  investedCapital?: number;
  totalDebt?: number;
  ordinarySharesNumber?: number;
  // cash flow statement
  freeCashFlow?: number;
  capitalExpenditure?: number;
  operatingCashFlow?: number;
};

export type Fundamental = {
  date: Date;
  revenue?: number;
  netIncome?: number;
  operatingCashFlow?: number;
  capitalExpenditure?: number;
  freeCashFlow?: number;
  totalAssets?: number;
  currentAssets?: number;
  nonCurrentAssets?: number;
  cashFinancial?: number;
  totalLiabilities?: number;
  currentDebt?: number;
  longTermDebt?: number;
  commonStockEquity?: number;
  stockholdersEquity?: number;
  dilutedEPS?: number;
  ebitda?: number;
  investedCapital?: number;
};

export type ReitsFundamental = {
  date: Date;
  // Income Statement
  revenue?: number;
  netIncome?: number;
  totalExpenses?: number; //revenue - netIncome, not same as totalExpenses in yahooFinance result
  price?: number;
  interestExpense?: number;
  // Balance Sheet
  totalDebt?: number;
  totalAssets?: number;
  currentAssets?: number;
  nonCurrentAssets?: number;
  totalLiabilities?: number;
  investmentProperties?: number;
  stockholdersEquity?: number;
  currentDebt?: number;
  longTermDebt?: number;
  ordinarySharesNumber?: number;
  // cash flow statement
  freeCashFlow?: number;
  operatingCashFlow?: number;
};
