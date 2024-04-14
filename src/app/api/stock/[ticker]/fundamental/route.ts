import { verifyAuthInApiRoute } from "@/app/api/lib/auth-verify";
import { catchRouteErrorHelper } from "@/app/api/lib/helper";
import { BadRequestError } from "@/lib/error";
import {
  Fundamental,
  ReitsFundamental,
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
  const periodType = searchParams.get("periodType") ?? "annual"; // quarterly or annual
  const type = searchParams.get("type"); //undefined or "reits"
  const { response } = await verifyAuthInApiRoute(req);
  if (response) {
    return response;
  }

  try {
    const results = (await yahooFinance.fundamentalsTimeSeries(ticker, {
      period1,
      module: "all",
      type: periodType,
    })) as any as YahooFundamentalResponse[];
    //normalize to per millions for big numbers
    if (!results.length) {
      throw new BadRequestError("No data found");
    }

    if (type === "reits") {
      const resp = results.map((result) => makeReitsFundamental(result));
      return NextResponse.json(resp);
    } else {
      const resp = results.map((result) => makeFundamental(result));
      return NextResponse.json(resp);
    }
  } catch (err) {
    return catchRouteErrorHelper(err, "api/stock/[ticker]/fundamental");
  }
};

const makeFundamental = (result: YahooFundamentalResponse): Fundamental => {
  return {
    date: result.date,
    revenue: result.totalRevenue,
    netIncome: result.netIncome,
    operatingCashFlow: result.operatingCashFlow,
    capitalExpenditure: result.capitalExpenditure,
    freeCashFlow: result.freeCashFlow,
    totalAssets: result.totalAssets,
    nonCurrentAssets: result.totalNonCurrentAssets,
    cashFinancial: result.cashFinancial,
    totalLiabilities: result.totalLiabilitiesNetMinorityInterest,
    currentDebt: result.currentDebt,
    longTermDebt: result.longTermDebt,
    commonStockEquity: result.commonStockEquity,
    stockholdersEquity: result.stockholdersEquity,
    dilutedEPS: result.dilutedEPS,
    ebitda: result.EBITDA,
    investedCapital: result.investedCapital,
    currentAssets: result.currentAssets,
  };
};

const makeReitsFundamental = (
  result: YahooFundamentalResponse
): ReitsFundamental => {
  const totalExpenses =
    result.totalRevenue && result.netIncome
      ? result.totalRevenue - result.netIncome
      : undefined;
  return {
    date: result.date,
    currentAssets: result.currentAssets,
    freeCashFlow: result.freeCashFlow,
    netIncome: result.netIncome,
    nonCurrentAssets: result.totalNonCurrentAssets,
    operatingCashFlow: result.operatingCashFlow,
    revenue: result.totalRevenue,
    totalAssets: result.totalAssets,
    totalExpenses,
    investmentProperties: result.investmentProperties,
    currentDebt: result.currentDebt,
    longTermDebt: result.longTermDebt,
    stockholdersEquity: result.stockholdersEquity,
    totalLiabilities: result.totalLiabilitiesNetMinorityInterest,
    interestExpense: result.interestExpense,
    totalDebt: result.totalDebt,
    ordinarySharesNumber: result.ordinarySharesNumber,
  };
};
