import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { GetProfileResponse } from "@/app/api/stock/fmp/[ticker]/company-info/response";
import { config } from "@/lib/config";
import { catchErrorHelper, responseErrorHelper } from "@/lib/error";

export const getReitsAnalysis = async ({
  ticker,
  sessionId,
}: {
  ticker: string;
  sessionId: string;
}) => {
  try {
    const resp = await fetch(
      `${config.baseUrl}/api/stock/fmp/${ticker}/company-info`,
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      }
    );
    if (!resp.ok) {
      const data = await resp.json();
      return responseErrorHelper(resp.status, data.error?.message);
    }
    const data = (await resp.json()) as GetProfileResponse;
    return data;
  } catch (err) {
    return catchErrorHelper("getReitsAnalysis", err);
  }
};

export const makeDividendPerYear = (
  dividends: Awaited<ReturnType<typeof fmpApi.getDividends>>
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
