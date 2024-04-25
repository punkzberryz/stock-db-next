import { DividendResponse } from "@/schema/stock/dividend.schema";
import { Dividend } from "@prisma/client";

export const makeDividendResponseFromDb = (
  dividendFromDb: Dividend
): DividendResponse => {
  const dividends: DividendResponse["dividends"] = [];
  dividendFromDb.date.forEach((date, index) => {
    dividends.push({
      date,
      dividend: dividendFromDb.dividend[index] ?? 0,
    });
  });
  return {
    ...dividendFromDb,
    dividends,
  };
};

export const makeDividendPerYear = (
  dividends: DividendResponse["dividends"]
) => {
  // accumulate dividends to get yearly dividends
  const yearlyDividends = dividends.reduce((acc, dividend) => {
    const year = new Date(dividend.date).getFullYear();
    if (!acc[year]) {
      acc[year] = 0;
    }
    //also create next year element, to fill out dividend if next year dividend is 0
    if (!acc[year + 1]) {
      acc[year + 1] = 0;
    }
    acc[year] += dividend.dividend;
    return acc;
  }, {} as Record<number, number>);
  //convert back to array
  const yearlyDividendsArray = Object.entries(yearlyDividends).map(
    ([year, dividend]) => ({
      year: parseInt(year),
      dividend,
    })
  );
  //remove last element, since it's dummy element
  const length = yearlyDividendsArray.length;
  return yearlyDividendsArray.splice(0, length - 1);
};
export const makeDividendForDb = (dividends: DividendResponse): Dividend => {
  const date: string[] = [];
  const dividend: number[] = [];
  //sort by date ascending
  const dividendData = dividends.dividends.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  dividendData.forEach((div) => {
    date.push(div.date);
    dividend.push(div.dividend);
  });
  return {
    ...dividends,
    date,
    dividend,
  };
};
