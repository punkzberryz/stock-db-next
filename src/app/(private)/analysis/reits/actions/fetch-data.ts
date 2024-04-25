"use server";

import { makeDividendResponseFromDb } from "@/action/stock/dividend-service";
import { calculateReitsKeyMetrics } from "@/action/stock/reits";
import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { catchErrorHelper, InternalServerError } from "@/lib/error";
import { prismadb } from "@/lib/prismadb";
import { DividendResponse } from "@/schema/stock/dividend.schema";
import {
  CompanyProfile,
  FinancialStatement,
  ReitsKeyMetrics,
} from "@prisma/client";

export const fetchDataForReitsAnalysis = async (
  ticker: string
): Promise<{
  profile: CompanyProfile;
  keymetrics: ReitsKeyMetrics[];
  financials: FinancialStatement[];
  dividends: DividendResponse;
}> => {
  try {
    //fetch data from db
    const symbol = ticker.toUpperCase();
    const [profile, financials, keymetrics, dividends] = await Promise.all([
      prismadb.companyProfile.findUnique({
        where: { symbol },
      }),
      prismadb.financialStatement.findMany({
        where: { symbol },
        orderBy: {
          date: "asc",
        },
      }),
      prismadb.reitsKeyMetrics.findMany({
        where: { symbol },
        orderBy: {
          date: "asc",
        },
      }),
      prismadb.dividend.findUnique({
        where: { symbol },
      }),
    ]);

    if (dividends && financials.length && keymetrics.length && profile) {
      console.log("found data in db");
      return {
        profile,
        keymetrics,
        financials,
        dividends: makeDividendResponseFromDb(dividends),
      };
    }
  } catch (err) {
    return catchErrorHelper("fetchDataForReitsAnalysis - from db", err);
  }

  try {
    //data from database not found, fetch from api
    const [profile, dividends, financial] = await Promise.all([
      fmpApi.getProfile(ticker),
      fmpApi.getDividends(ticker),
      fmpApi.getFinancialStatements(ticker),
    ]);
    console.log("found data from api");
    const keymetrics = calculateReitsKeyMetrics(financial);
    return {
      profile,
      keymetrics,
      financials: financial,
      dividends,
    };
  } catch (err) {
    return catchErrorHelper("fetchDataForReitsAnalysis - from api", err);
  }
};
