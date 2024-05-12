"use server";
import { makeDividendForDb } from "@/action/stock/dividend-service";
import { ReitsRatingResult } from "@/action/stock/reits";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { prismadb } from "@/lib/prismadb";
import { DividendResponse } from "@/schema/stock/dividend.schema";
import {
  CompanyProfile,
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
  ReitsKeyMetrics,
} from "@prisma/client";

export type ServerActionError = { message: string; code: number };
//TODO: move actions to individual files

export const saveFinancialsToDb = async (
  financials: FinancialStatement[]
): Promise<{ error?: ServerActionError }> => {
  const financialsData = financials.map((f) => {
    const { createdAt, updatedAt, ...financial } = f;
    return financial;
  });
  try {
    await prismadb.financialStatement.createMany({
      data: financialsData,
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveFinancialGrowthRateToDb = async (
  growths: FinancialGrowthRate[]
): Promise<{ error?: ServerActionError }> => {
  const growthsData = growths.map((g) => {
    const { createdAt, updatedAt, ...growth } = g;
    return growth;
  });
  try {
    await prismadb.financialGrowthRate.createMany({
      data: growthsData,
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveFinancialRatioToDb = async (
  ratios: FinancialRatio[]
): Promise<{ error?: ServerActionError }> => {
  const ratiosData = ratios.map((r) => {
    const { createdAt, updatedAt, ...ratio } = r;
    return ratio;
  });
  try {
    await prismadb.financialRatio.createMany({
      data: ratiosData,
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveCompanyProfileToDb = async (
  profile: CompanyProfile
): Promise<{ error?: ServerActionError }> => {
  const profileData = {
    ...profile,
    createdAt: undefined,
    updatedAt: undefined,
  };
  try {
    await prismadb.companyProfile.create({
      data: profileData,
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveReitsKeyMetricsToDb = async (
  reitsKeyMetrics: ReitsKeyMetrics[]
): Promise<{ error?: ServerActionError }> => {
  const reitsKeyMetricsData = reitsKeyMetrics.map((r) => {
    const { createdAt, updatedAt, ...reitsKeyMetric } = r;
    return reitsKeyMetric;
  });
  try {
    await prismadb.reitsKeyMetrics.createMany({
      data: reitsKeyMetricsData,
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveDividendToDb = async (
  dividends: DividendResponse
): Promise<{ error?: ServerActionError }> => {
  const dividendsData = makeDividendForDb(dividends);
  try {
    await prismadb.dividend.create({
      data: {
        symbol: dividendsData.symbol,
        date: dividendsData.date,
        dividend: dividendsData.dividend,
      },
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveReitsRatingToDb = async (
  rating: ReitsRatingResult,
  symbol: string
): Promise<{ error?: ServerActionError }> => {
  try {
    const { score, maxScore, ratingCriteria } = rating;
    const criteria = ratingCriteria.map((c) => JSON.stringify(c));

    await prismadb.reitsRating.createMany({
      data: [
        {
          score,
          maxScore,
          symbol,
          ratingCriteria: criteria,
        },
      ],
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};
