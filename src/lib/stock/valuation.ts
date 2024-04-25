/*
  ref: https://www.youtube.com/watch?v=95533CHeanc
*/
export const calculateIntrinsicValue = ({
  growthRateAssumption,
  terminalPriceToFCF,
  discountRate,
  cashAndShortTermInvestments,
  totalLiabilities,
  latestFreeCashFlow,
  shareOutstanding,
}: {
  growthRateAssumption: number;
  latestFreeCashFlow: number;
  terminalPriceToFCF: number; // guesiing price to free cash flow in the terminal year (next ten year)
  discountRate: number; // discount rate, take 10-12% from s/p500 returns
  totalLiabilities: number;
  cashAndShortTermInvestments: number;
  shareOutstanding: number;
}) => {
  const fcf: number[] = [];
  fcf.push(latestFreeCashFlow);
  let latestFcf = latestFreeCashFlow;
  let nvpFCF = 0;
  for (let i = 0; i < 10; i++) {
    latestFcf = latestFcf * (1 + growthRateAssumption);
    nvpFCF = nvpFCF + latestFcf / Math.pow(discountRate + 1, i + 1);
  }
  const terminalValue = latestFcf * terminalPriceToFCF;
  const pvTerminalValue = terminalValue / Math.pow(1 + discountRate, 10);
  const priceValueSum = nvpFCF + pvTerminalValue;
  const netDebt = cashAndShortTermInvestments - totalLiabilities;
  const intrinsicDeductNetDebt = priceValueSum + netDebt;
  return intrinsicDeductNetDebt / shareOutstanding;
};
