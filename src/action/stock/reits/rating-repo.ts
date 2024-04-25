"use server";

import { catchErrorForServerActionHelper } from "@/lib/error";
import { prismadb } from "@/lib/prismadb";
import { ReitsRatingCriteria } from "./rating-service";

export const getReitsRatingsBySymbol = async (symbol: string) => {
  try {
    const ratings = await prismadb.reitsRating.findMany({
      where: { symbol },
    });
    return {
      ratings: ratings ?? undefined,
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};

export const getAllReitsRating = async () => {
  try {
    const reitsRating = await prismadb.reitsRating.findMany();
    const rating = reitsRating.map((r) => {
      const ratingCriteria = r.ratingCriteria.map(
        (rc) => JSON.parse(rc) as ReitsRatingCriteria
      );

      return {
        ...r,
        ratingCriteria,
      };
    });
    return {
      reitsRating: rating,
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};
