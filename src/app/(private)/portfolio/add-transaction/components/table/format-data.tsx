import { formatCurrency, formatDateString } from "@/lib/format";
import { Transaction } from "@prisma/client";

export const makeTransactionTableData = (data: Transaction[]) => {
  return data.map((d) => ({
    id: d.id,
    Date: formatDateString(d.date),
    Symbol: d.ticker,
    Type: <span className="capitalize">{d.type}</span>,
    Price: formatCurrency(d.price, {
      currency: d.currency,
      maximumFractionDigits: 1,
    }),
    Unit: formatCurrency(d.unit, {
      style: "decimal",
      maximumFractionDigits: 1,
    }),
    Value: formatCurrency(d.price * d.unit, {
      currency: d.currency,
      maximumFractionDigits: 1,
    }),
    Fee: formatCurrency(d.fee, {
      currency: d.currency,
      maximumFractionDigits: 1,
    }),
  }));
};

export type TransactionTableData = ReturnType<
  typeof makeTransactionTableData
>[number];
