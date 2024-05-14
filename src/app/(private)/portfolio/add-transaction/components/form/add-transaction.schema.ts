import { z } from "zod";
export const transactionTypes = ["buy", "sell", "dividend"] as const;
export const currencyTypes = ["USD", "SGD", "THB"] as const;
export const addTransactionFormSchema = z.object({
  ticker: z.string().min(1),
  currency: z.enum(currencyTypes),
  type: z.enum(transactionTypes),
  date: z.date(),
  price: z.number(),
  unit: z.number(),
  fee: z.number(),
});

export type AddTransactionFormSchema = z.infer<typeof addTransactionFormSchema>;
