import { Dividend } from "@prisma/client";
type DividendItem = { dividend: number; date: string };

export type DividendResponse = {
  symbol: string;
  dividends: DividendItem[];
  createdAt: Date;
  updatedAt: Date;
};
