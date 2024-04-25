import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import { FMP_URL } from "../config";
import { DividendResponse } from "@/schema/stock/dividend.schema";

export class FmpApiDividend {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async getDividends(symbol: string): Promise<DividendResponse> {
    try {
      const resp = await fetch(
        `${FMP_URL}/historical-price-full/stock_dividend/${symbol.toLowerCase()}?apikey=${
          this.apiKey
        }`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as {
        symbol: string;
        historical: FmpDividend[];
      };
      const historical = data.historical;
      // sort date by asc instead of desc
      historical.reverse();
      const now = new Date();
      return {
        symbol: data.symbol,
        createdAt: now,
        updatedAt: now,
        dividends: historical.map((dividend) => ({
          date: dividend.date,
          dividend: dividend.dividend,
        })),
      };
    } catch (err) {
      return catchErrorHelper("FmpApi - getDividends", err);
    }
  }
}
type FmpDividend = {
  date: string;
  label?: string;
  adjDividend?: number;
  dividend: number;
  recordDate?: string;
  paymentDate?: string;
  declarationDate?: string;
};
