"use server";

import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { catchErrorForServerActionHelper } from "@/lib/error";
import { PrismaClientErrorCode, prismadb } from "@/lib/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getReitsAnalysisResultsFromDb = async (ticker: string) => {
  try {
    const symbol = ticker.toUpperCase();
    const [profile, financials, reitsKeyMetrics, dividends] = await Promise.all(
      [
        prismadb.companyProfile.findUnique({
          where: { symbol },
        }),
        prismadb.financialStatement.findMany({
          where: { symbol },
        }),
        prismadb.reitsKeyMetrics.findMany({
          where: { symbol },
        }),
        prismadb.dividend.findUnique({
          where: { symbol },
        }),
      ]
    );
    if (!profile) {
      return {};
    }

    return {
      profile,
      financials,
      reitsKeyMetrics,
      dividends,
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const createReitsAnalysisResults = async ({
  dividends,
  financials,
  profile,
  reitsKeyMetrics,
}: {
  profile: Awaited<ReturnType<typeof fmpApi.getProfile>>;
  financials: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["financials"];
  reitsKeyMetrics: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["reitsKeyMetrics"];
  dividends: Awaited<ReturnType<typeof fmpApi.getDividends>>;
}) => {
  const dividendDate: string[] = [];
  const dividendAmount: number[] = [];
  dividends.forEach((d) => {
    dividendDate.push(d.date);
    dividendAmount.push(d.dividend);
  });
  try {
    // const [profileResp, financialResp, reitsResp, dividendResp] =
    await prismadb.$transaction([
      prismadb.companyProfile.create({
        data: {
          ceo: profile.ceo,
          description: profile.description,
          companyName: profile.companyName,
          country: profile.country,
          currency: profile.currency,
          exchangeShortName: profile.exchangeShortName,
          industry: profile.industry,
          ipoDate: profile.ipoDate,
          mktCap: profile.mktCap,
          price: profile.price,
          sector: profile.sector,
          symbol: profile.symbol,
          website: profile.website,
          dcf: profile.dcf,
          dcfDiff: profile.dcfDiff,
          image: profile.image,
        },
      }),
      prismadb.financialStatement.createMany({
        data: financials.map((f) => ({
          ...f,
          symbol: profile.symbol,
          date: new Date(f.date),
        })),
      }),
      prismadb.reitsKeyMetrics.createMany({
        data: reitsKeyMetrics.map((r) => ({
          ...r,
          symbol: profile.symbol,
          date: new Date(r.date),
        })),
      }),
      prismadb.dividend.create({
        data: {
          symbol: profile.symbol,
          date: dividendDate,
          dividend: dividendAmount,
        },
      }),
    ]);
    return {};
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === PrismaClientErrorCode.UniqueConstraintViolation) {
        return {
          error: {
            message: "Data already exists in the database",
            code: 400,
          },
        };
      }
    }
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};
