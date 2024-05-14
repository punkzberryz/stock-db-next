"use server";

import { AddTransactionFormSchema } from "@/app/(private)/portfolio/add-transaction/components/form/add-transaction.schema";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { formatDateString } from "@/lib/format";
import { prismadb } from "@/lib/prismadb";

export const addTransaction = async (data: AddTransactionFormSchema) => {
  try {
    const { session } = await validateRequest();

    if (!session) throw new UnauthorizedError();

    await prismadb.transaction.create({
      data: {
        currency: data.currency,
        date: data.date,
        fee: data.fee,
        price: data.price,
        ticker: data.ticker.toUpperCase(),
        type: data.type,
        unit: data.unit,
        userId: session.userId,
      },
    });

    return {};
  } catch (err) {
    console.log(err);
    const error = catchErrorForServerActionHelper(err);
    console.error(error.message);
    console.error(error.code);
    return { error };
  }
};
