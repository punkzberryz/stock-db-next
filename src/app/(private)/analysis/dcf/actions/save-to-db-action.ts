"use server";

import { catchErrorForServerActionHelper } from "@/lib/error";
import { prismadb } from "@/lib/prismadb";
import {
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
} from "@prisma/client";

export const saveToDbAction = async ({
  financials,
  growths,
  ratios,
}: {
  financials: FinancialStatement[];
  ratios: FinancialRatio[];
  growths: FinancialGrowthRate[];
}) => {
  const financialsData = financials.map((f) => {
    const { createdAt, updatedAt, ...financial } = f;
    return financial;
  });
  const ratiosData = ratios.map((r) => {
    const { createdAt, updatedAt, ...ratio } = r;
    return ratio;
  });
  const growthsData = growths.map((g) => {
    const { createdAt, updatedAt, ...growth } = g;
    return growth;
  });

  try {
    await prismadb.$transaction([
      prismadb.financialRatio.createMany({
        data: ratiosData,
      }),
      prismadb.financialStatement.createMany({
        data: financialsData,
      }),
      prismadb.financialGrowthRate.createMany({
        data: growthsData,
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
