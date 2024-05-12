"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { Info, YahooQuoteResponse } from "@/schema/stock/info.schema";
import yahooFinance from "yahoo-finance2";

export const fetchQuote = async (
  symbol: string
): Promise<{
  data?: Info;
  error?: {
    message: string;
    code: number;
  };
}> => {
  //fetch quote from yahoo finance
  try {
    const quote = (await yahooFinance.quote(symbol)) as YahooQuoteResponse;

    return {
      data: {
        longName: quote.longName,
        fullExchangeName: quote.fullExchangeName,
        symbol: quote.symbol,
        marketCap: quote.marketCap,
        sharesOutstanding: quote.sharesOutstanding,
        price: quote.regularMarketPrice,
      },
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
