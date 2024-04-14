import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
// http://localhost:3000/api/test?type=fundamental
// http://localhost:3000/api/test?type=info&symbol=WHAIR.BK
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const symbol = searchParams.get("symbol") ?? "LHHOTEL.BK";
  if (!symbol) {
    return NextResponse.json({ message: "Missing symbol" }, { status: 400 });
  }
  const type = (searchParams.get("type") ?? "fundamental") as
    | "chart"
    | "historical"
    | "info"
    | "insights"
    | "quoteSummary"
    | "search"
    | "recommendations"
    | "fundamental";
  try {
    const query = symbol;
    let result: any = {};
    if (type === "chart") {
      result = await yahooFinance.chart(query, { period1: "2021-05-08" });
    }
    if (type === "info") {
      result = await yahooFinance.quote(query);
    }
    if (type === "historical") {
      result = await yahooFinance.historical(query, { period1: "2021-05-08" });
    }
    if (type === "fundamental") {
      result = await yahooFinance.fundamentalsTimeSeries(query, {
        period1: "2015-01-01",
        module: "all",
        type: "annual",
      });
    }
    if (type === "insights") {
      result = await yahooFinance.insights(query);
    }
    if (type === "quoteSummary") {
      result = await yahooFinance.quoteSummary(query, {
        modules: [
          // "summaryDetail",
          // "cashflowStatementHistory",
          // "earningsTrend",
          // "fundProfile",
          // "assetProfile",
          // "industryTrend",
          "sectorTrend",
          "defaultKeyStatistics",
        ],
      });
    }
    if (type === "search") {
      result = await yahooFinance.search(query);
    }
    if (type === "recommendations") {
      result = await yahooFinance.recommendationsBySymbol(query);
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
};
