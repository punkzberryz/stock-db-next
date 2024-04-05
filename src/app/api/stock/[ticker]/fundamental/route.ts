import { catchRouteErrorHelper } from "@/app/api/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { ticker: string };
  }
) => {
  const { ticker } = params;
  const searchParams = req.nextUrl.searchParams;
  const period1 = searchParams.get("period1") ?? "2015-01-01";
  const type = searchParams.get("type") ?? "annual"; // quarterly or annual

  try {
    const result = await yahooFinance.fundamentalsTimeSeries(ticker, {
      period1,
      module: "all",
      type,
    });
    return NextResponse.json(result);
  } catch (err) {
    return catchRouteErrorHelper(err, "api/stock/[ticker]/fundamental");
  }
};
