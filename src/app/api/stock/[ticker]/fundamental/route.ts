import { catchRouteErrorHelper, divideByMillion } from "@/app/api/lib/helper";
import {
  Fundamental,
  YahooFundamentalResponse,
} from "@/schema/stock/fundamental.schema";
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
    const results = (await yahooFinance.fundamentalsTimeSeries(ticker, {
      period1,
      module: "all",
      type,
    })) as any as YahooFundamentalResponse[];
    //normalize to per millions for big numbers
    const resp = results.map(
      (result) =>
        ({
          ...result,
          revenue: divideByMillion(result.totalRevenue),
          netIncome: divideByMillion(result.netIncome),
          operatingCashFlow: divideByMillion(result.operatingCashFlow),
          capitalExpenditure: divideByMillion(result.capitalExpenditure),
          freeCashFlow: divideByMillion(result.freeCashFlow),
          totalAssets: divideByMillion(result.totalAssets),
          nonCurrentAssets: divideByMillion(result.totalNonCurrentAssets),
          cashFinancial: divideByMillion(result.cashFinancial),
          totalLiabilities: divideByMillion(
            result.totalLiabilitiesNetMinorityInterest
          ),
          currentDebt: divideByMillion(result.currentDebt),
          longTermDebt: divideByMillion(result.longTermDebt),
          commonStockEquity: divideByMillion(result.commonStockEquity),
          stockholdersEquity: divideByMillion(result.stockholdersEquity),
          dilutedEPS: result.dilutedEPS,
          ebitda: divideByMillion(result.EBITDA),
          investedCapital: divideByMillion(result.investedCapital),
          currentAssets: divideByMillion(result.currentAssets),
        } as Fundamental)
    );

    return NextResponse.json(resp);
  } catch (err) {
    return catchRouteErrorHelper(err, "api/stock/[ticker]/fundamental");
  }
};
