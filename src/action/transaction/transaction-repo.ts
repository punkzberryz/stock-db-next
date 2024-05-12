"use server";

import { AddTransactionFormSchema } from "@/app/(private)/transaction/components/form/add-transaction.schema";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { formatDateString } from "@/lib/format";
import { prismadb } from "@/lib/prismadb";

export const addTransaction = async (data: AddTransactionFormSchema) => {
  try {
    console.log("adding transaction");
    console.log(data);

    const { session } = await validateRequest();
    console.log("session", session?.id);
    console.log("session", session?.userId);

    if (!session) throw new UnauthorizedError();

    await prismadb.transaction.create({
      data: {
        currency: data.currency,
        date: data.date,
        fee: data.fee,
        price: data.price,
        ticker: data.ticker,
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
