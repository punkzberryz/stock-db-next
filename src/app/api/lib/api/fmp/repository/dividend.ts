import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import { FMP_URL } from "../config";

export class FmpApiDividend {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async getDividends(symbol: string) {
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
        historical: Dividend[];
      };
      const historical = data.historical;
      // sort date by asc instead of desc
      historical.reverse();
      return historical;
    } catch (err) {
      return catchErrorHelper("FmpApi - getDividends", err);
    }
  }
}
type Dividend = {
  date: string;
  label?: string;
  adjDividend?: number;
  dividend: number;
  recordDate?: string;
  paymentDate?: string;
  declarationDate?: string;
};
