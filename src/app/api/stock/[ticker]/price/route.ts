import { verifyAuthInApiRoute } from "@/app/api/lib/auth-verify";
import { catchRouteErrorHelper } from "@/app/api/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
// http://localhost:3000/api/stock/LHHOTEL.BK/price
export const GET = async (
  req: NextRequest,
  { params }: { params: { ticker: string } }
) => {
  const { response } = await verifyAuthInApiRoute(req);
  if (response) {
    return response;
  }
  const { ticker } = params;
  const searchParams = req.nextUrl.searchParams;
  const period1 = searchParams.get("period1") ?? "2015-01-01";
  try {
    const results = await yahooFinance.chart(ticker, {
      period1,
      includePrePost: false,
      interval: "1mo",
      // return: "object",
    });

    return NextResponse.json(results);
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/stock/[ticker]/price");
  }
};

enum YahooPriceErrorResponse {
  stockNotFound = "Cannot read properties of undefined (reading 'symbol')",
}
