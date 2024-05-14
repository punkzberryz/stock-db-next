import { formatCurrency } from "@/lib/format";
import { Currency } from "@/lib/get-currency";
import { Transaction } from "@prisma/client";

export const makeInitialPortfolioData = (transactions: Transaction[]) => {
  //We accumulate the data in a map, the market price related value will be updated later
  const portfolio = new Map<string, PortfolioRow>();
  transactions.forEach((tx) => {
    if (!portfolio.get(tx.ticker)) {
      portfolio.set(tx.ticker, {
        ticker: tx.ticker,
        currency: tx.currency as Currency,
        cumulativeUnit: 0,
        dividendsCollected: 0,
        cumulativeCost: 0,
        gainFromSale: 0,
      });
    }
    const row = portfolio.get(tx.ticker)!; //safe to assume that the row exists
    let cumulativeUnit = row.cumulativeUnit;
    let cumulativeCost = row.cumulativeCost;
    let gainFromSale = row.gainFromSale;
    let dividendsCollected = row.dividendsCollected;

    if (tx.type === "buy") {
      cumulativeUnit += tx.unit;
      const transactedValue = tx.price * tx.unit + tx.fee;
      cumulativeCost += transactedValue;
    }
    if (tx.type === "sell") {
      cumulativeUnit -= tx.unit;
      const transactedValue = tx.price * tx.unit - tx.fee;
      const costOfTransaction =
        (tx.unit / row.cumulativeUnit) * row.cumulativeCost;
      cumulativeCost -= costOfTransaction;
      gainFromSale += transactedValue - costOfTransaction;
    }
    if (tx.type === "dividend") {
      const transactedValue = tx.price * tx.unit - tx.fee;
      dividendsCollected += transactedValue;
    }

    portfolio.set(tx.ticker, {
      ...row,
      cumulativeUnit,
      cumulativeCost,
      gainFromSale,
      dividendsCollected,
    });
  });
  return portfolio;
};

export const makeFinalPortfolioData = (
  portfolio: PortfolioRow[],
  stockPrices: (number | undefined)[]
): PortfolioRowData[] => {
  return portfolio.map((row, index) => {
    const price = stockPrices[index] || NaN;
    const {
      cumulativeUnit: shares,
      cumulativeCost: cost,
      dividendsCollected,
      gainFromSale: realizedGain,
    } = row;

    const costPerShare = shares === 0 ? 0 : cost / shares;
    const unrealizedGain = (price - costPerShare) * shares;
    const unrealizedGainRatio = cost === 0 ? 0 : unrealizedGain / cost;
    const totalGain = realizedGain + unrealizedGain + dividendsCollected;
    const marketValue = cost + unrealizedGain;

    return {
      Ticker: row.ticker,
      Shares: formatUnit(shares),
      Cost: formatPrice(cost, row.currency),
      CostPerShare: formatPrice(costPerShare, row.currency),
      DividendsCollected: formatPrice(dividendsCollected, row.currency),
      Price: formatPrice(price, row.currency),
      MarketValue: formatPrice(marketValue, row.currency),
      RealizedGain: formatPrice(realizedGain, row.currency),
      TotalGain: formatPrice(totalGain, row.currency),
      UnrealizedGain: formatPrice(unrealizedGain, row.currency),
      UnrealizedGainRatio: formatPercent(unrealizedGainRatio),
    };
  });
};

function formatUnit(value: number) {
  return formatCurrency(value, {
    notation: "compact",
    style: "decimal",
    maximumFractionDigits: 1,
  });
}
function formatPrice(price: number, currency?: Currency) {
  return formatCurrency(price, {
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  });
}
function formatPercent(value: number) {
  return formatCurrency(value, {
    notation: "compact",
    style: "percent",
    maximumFractionDigits: 1,
  });
}
export type PortfolioRow = {
  ticker: string;
  cumulativeUnit: number;
  dividendsCollected: number;
  cumulativeCost: number;
  gainFromSale: number;
  currency: Currency;
};
export type PortfolioRowData = {
  Ticker: string;
  Price: string;
  Shares: string;
  Cost: string;
  CostPerShare: string;
  UnrealizedGain: string;
  UnrealizedGainRatio: string;
  RealizedGain: string;
  DividendsCollected: string;
  TotalGain: string;
  MarketValue: string;
};
