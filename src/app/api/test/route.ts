import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ message: "Missing symbol" }, { status: 400 });
  }
  try {
    const query = symbol;
    const queryOptions = { period1: "2015-01-01", module: "all" };
    const result = await yahooFinance.fundamentalsTimeSeries(query, {
      ...queryOptions,
      type: "annual",
    });

    console.log(result);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
};
