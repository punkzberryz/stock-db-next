export type YahooFundamentalResponse = {
  date: Date;
  totalRevenue?: number;
  netIncome?: number;
  operatingCashFlow?: number;
  capitalExpenditure?: number;
  freeCashFlow?: number;
  totalAssets?: number;
  currentAssets?: number;
  totalNonCurrentAssets?: number;
  cashFinancial?: number;
  totalLiabilitiesNetMinorityInterest?: number;
  currentDebt?: number;
  longTermDebt?: number;
  commonStockEquity?: number;
  stockholdersEquity?: number;
  dilutedEPS?: number;
  EBITDA?: number;
  investedCapital?: number;
};

export type Fundamental = {
  date: Date;
  revenue?: number; //per Million
  netIncome?: number; //per Million
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
