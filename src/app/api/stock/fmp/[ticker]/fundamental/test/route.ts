import { getReitsAnalysisResultsFromDb } from "@/action/stock/stock-action/reits-analysis";
import { FMP_URL } from "@/app/api/lib/api/fmp/config";
import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { FmpApiFinancial } from "@/app/api/lib/api/fmp/repository/financials";
import { catchRouteErrorHelper } from "@/app/api/lib/helper";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { ticker: string };
  }
) => {
  try {
    // const income = await fmpApi.getIncomeStatements(params.ticker);

    // const api = new FmpApiFinancial(process.env.FMP_API_KEY!);
    // const metrics = await api.getKeyMetrics(params.ticker);
    // const reits = await fmpApi.getReitsAnalysis(params.ticker);
    // const dividends = await fmpApi.getDividends(params.ticker);
    // const profile = await fmpApi.getProfile(params.ticker);
    const x = await getReitsAnalysisResultsFromDb(params.ticker);
    return NextResponse.json({
      // reits,
      // profile,
      x,
    });
  } catch (err) {
    return catchRouteErrorHelper(err, "test");
  }
};
