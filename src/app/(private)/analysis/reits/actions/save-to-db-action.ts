"use server";
import { prismadb } from "@/lib/prismadb";
import { catchErrorForServerActionHelper } from "@/lib/error";
import { DividendResponse } from "@/schema/stock/dividend.schema";
import {
  CompanyProfile,
  FinancialStatement,
  ReitsKeyMetrics,
} from "@prisma/client";
import { ReitsRatingResult } from "@/action/stock/reits";
import { makeDividendForDb } from "@/action/stock/dividend-service";

export const saveMetricsToDbAction = async ({
  dividends,
  financials,
  profile,
  reitsKeyMetrics,
}: {
  dividends: DividendResponse;
  financials: FinancialStatement[];
  reitsKeyMetrics: ReitsKeyMetrics[];
  profile: CompanyProfile;
}) => {
  try {
    const financialsData = financials.map((f) => {
      const { createdAt, updatedAt, ...financial } = f;
      return financial;
    });
    const reitsKeyMetricsData = reitsKeyMetrics.map((r) => {
      const { createdAt, updatedAt, ...reitsKeyMetric } = r;
      return reitsKeyMetric;
    });
    const profileData = {
      ...profile,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const dividendsData = makeDividendForDb(dividends);

    await prismadb.$transaction([
      prismadb.financialStatement.createMany({
        data: financialsData,
      }),
      prismadb.reitsKeyMetrics.createMany({
        data: reitsKeyMetricsData,
      }),
      prismadb.dividend.create({
        data: {
          symbol: dividendsData.symbol,
          date: dividendsData.date,
          dividend: dividendsData.dividend,
        },
      }),
      prismadb.companyProfile.create({
        data: profileData,
      }),
    ]);
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const saveReitsRatingToDbAction = async ({
  rating,
  symbol,
}: {
  rating: ReitsRatingResult;
  symbol: string;
}) => {
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
    console.log(err);
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};
