"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { prismadb } from "@/lib/prismadb";

export const fetchManyCompanyProfile = async (
  { limit, pageId }: { limit: number; pageId: number } = {
    limit: 10,
    pageId: 1,
  }
) => {
  try {
    const profiles = await prismadb.companyProfile.findMany({
      take: limit,
      skip: limit * (pageId - 1),
      orderBy: {
        symbol: "asc",
      },
    });
    return { data: profiles };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
