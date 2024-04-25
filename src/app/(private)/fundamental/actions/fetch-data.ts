"use server";

import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { catchErrorHelper, InternalServerError } from "@/lib/error";
import { prismadb } from "@/lib/prismadb";
import { CompanyProfile, FinancialStatement } from "@prisma/client";

export const fetchDataForFundamental = async (
  ticker: string
): Promise<{
  profile: CompanyProfile;
  financials: FinancialStatement[];
}> => {
  try {
    const symbol = ticker.toUpperCase();
    const [profile, financials] = await Promise.all([
      prismadb.companyProfile.findUnique({
        where: { symbol },
      }),
      prismadb.financialStatement.findMany({
        where: { symbol },
        orderBy: { date: "asc" },
      }),
    ]);

    if (profile && financials.length) {
      console.log("found data in db");
      return { profile, financials };
    }
  } catch (err) {
    return catchErrorHelper("fetchDataForFundamental - from db", err);
  }
  try {
    //data not found in db, fetch from api
    const [profile, financials] = await Promise.all([
      fmpApi.getProfile(ticker),
      fmpApi.getFinancialStatements(ticker),
    ]);
    return {
      profile,
      financials,
    };
  } catch (err) {
    return catchErrorHelper("fetchDataForFundamental - from api", err);
  }
};
