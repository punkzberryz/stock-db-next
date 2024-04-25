"use server";

import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { BadRequestError, InternalServerError } from "@/lib/error";
import { prismadb } from "@/lib/prismadb";
import {
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
} from "@prisma/client";

export const fetchDataForDcf = async (ticker: string) => {
  //Declare all variables we need to fetch
  let financials: FinancialStatement[] = [];
  let growths: FinancialGrowthRate[] = [];
  let ratios: FinancialRatio[] = [];

  try {
    //fetch data from db
    const symbol = ticker.toUpperCase();
    const [financialsFromDb, growthsFromDb, ratiosFromDb] = await Promise.all([
      prismadb.financialStatement.findMany({
        where: { symbol },
        orderBy: {
          date: "asc",
        },
      }),
      prismadb.financialGrowthRate.findMany({
        where: { symbol },
        orderBy: {
          date: "asc",
        },
      }),
      prismadb.financialRatio.findMany({
        where: { symbol },
        orderBy: {
          date: "asc",
        },
      }),
    ]);

    //found data
    ratios = ratiosFromDb;
    financials = financialsFromDb;
    growths = growthsFromDb;
  } catch (err) {
    console.log(err);
    throw new InternalServerError("failed to fetch data from db");
  }
  if (!financials.length || !growths.length || !ratios.length) {
    //data from database not found, fetch from api
    try {
      const [financialsFromApi, growthsFromApi, ratiosFromApi] =
        await Promise.all([
          fmpApi.getFinancialStatements(ticker),
          fmpApi.getGrowthMetrics(ticker),
          fmpApi.getFinancialRatios(ticker),
        ]);
      financials = financialsFromApi;
      growths = growthsFromApi;
      ratios = ratiosFromApi;
      console.log("data not found in db, fetching from api instead");
    } catch (err) {
      console.log(err);
      throw new InternalServerError("failed to fetch data from api");
    }
  }
  if (!financials.length || !growths.length || !ratios.length) {
    throw new BadRequestError("data from ticker not found in db or api");
  }
  return { financials, growths, ratios };
};
