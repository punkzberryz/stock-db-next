import { verifyAuthInApiRoute } from "@/app/api/lib/auth-verify";
import { catchRouteErrorHelper } from "@/app/api/lib/helper";
import { Info, YahooQuoteResponse } from "@/schema/stock/info.schema";
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export const GET = async (
  req: NextRequest,
  { params }: { params: { ticker: string } }
) => {
  const { response } = await verifyAuthInApiRoute(req);
  if (response) {
    return response;
  }

  const { ticker } = params;
  try {
    const results = (await yahooFinance.quote(ticker)) as YahooQuoteResponse;
    return NextResponse.json({
      symbol: results.symbol,
      fullExchangeName: results.fullExchangeName,
      longName: results.longName,
      marketCap: results.marketCap,
      sharesOutstanding: results.sharesOutstanding,
    } as Info);
  } catch (err) {
    return catchRouteErrorHelper(err, "api/stock/[ticker]/info");
  }
};

enum YahooQuoteErrorResponse {
  stockNotFound = "Cannot read properties of undefined (reading 'symbol')",
}
