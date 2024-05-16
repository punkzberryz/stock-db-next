"use server";

import { TransactionFormSchema } from "@/app/(private)/portfolio/add-transaction/components/form/transaction.schema";
import { validateRequest } from "@/lib/auth";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { prismadb } from "@/lib/prismadb";

export const addTransaction = async (data: TransactionFormSchema) => {
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
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const editTransaction = async (
  data: TransactionFormSchema,
  id: number
) => {
  try {
    const { session } = await validateRequest();

    if (!session) throw new UnauthorizedError();
    //check if transaction exists and belongs to the user
    const transaction = await prismadb.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) throw new BadRequestError("Transaction not found");
    if (transaction.userId !== session.userId)
      throw new UnauthorizedError("Transaction does not belong to user");

    await prismadb.transaction.update({
      where: { id },
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
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const { session } = await validateRequest();
    if (!session) throw new UnauthorizedError();
    //check if transaction exists and belongs to the user
    const transaction = await prismadb.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) throw new BadRequestError("Transaction not found");
    if (transaction.userId !== session.userId)
      throw new UnauthorizedError("Transaction does not belong to user");

    await prismadb.transaction.delete({
      where: {
        id,
      },
    });

    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getTransactionById = async (id: number) => {
  try {
    const { session } = await validateRequest();
    if (!session) throw new UnauthorizedError();
    const transaction = await prismadb.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!transaction) throw new BadRequestError("Transaction not found");
    return { transaction };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
