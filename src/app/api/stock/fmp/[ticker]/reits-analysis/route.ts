import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { verifyAuthInApiRoute } from "@/app/api/lib/auth-verify";
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
  const { ticker } = params;
  const { response } = await verifyAuthInApiRoute(req);
  if (response) {
    return response;
  }
  try {
    const { financials, reitsAnalysis } = await fmpApi.getReitsAnalysis(ticker);
    return NextResponse.json({
      financials,
      reitsAnalysis,
    });
  } catch (err) {
    return catchRouteErrorHelper(
      err,
      "GET /api/stock/fmp/[ticker]/reits-analysis"
    );
  }
};
