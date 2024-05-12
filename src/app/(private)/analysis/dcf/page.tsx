import MaxWidthWrapper from "@/components/max-width-wrapper";
import DataTable from "@/components/Table/data-table";
import { getCurrencyFromSymbol } from "@/lib/get-currency";
import { growthMetricsColumnDef } from "./components/growth-metrics-column-def";
import { PriceToFCFChart } from "./components/price-to-fcf-chart";
import { valueToCurrency } from "@/lib/format";
import { getSessionId } from "@/lib/auth";
import Client from "./components/client";
import {
  calculateAverageGrowthRate,
  getValuation,
} from "@/action/stock/valuation-service";
import { fetchDataForDcf } from "./actions/fetch-data";
import { fetchQuote } from "@/action/stock/quote-repo";
import SaveToDb from "@/components/save-to-db/save-to-db";
import { metadataHelper } from "@/lib/metadata";

/*
  We should do this sequentially
  1) Get all required results from database
  2) if not found, get from api
  3) calculate values that we need
  4) display the result

  To calculate DCF, we need
  1) Financial Statement
  2) Financial Growth Rate
  3) Financial Ratio
  4) Company Profile  
*/

interface DiscountedCashFlowAnalysisPageProps {
  searchParams: {
    ticker?: string;
  };
}

const DiscountedCashFlowAnalysisPage = async ({
  searchParams,
}: DiscountedCashFlowAnalysisPageProps) => {
  const sessionId = getSessionId();
  if (!sessionId) {
    return (
      <MaxWidthWrapper>
        <p>Unauthorized</p>
      </MaxWidthWrapper>
    );
  }
  const ticker = searchParams.ticker ?? "META";
  const currency = getCurrencyFromSymbol(ticker);
  // 1) Get all required results from database or api
  const quoteResp = fetchQuote(ticker);
  const { financials, growths, ratios } = await fetchDataForDcf(ticker);

  // 2) calculate values that we need
  const { defaultParams, intrinsicValue } = getValuation({
    financials,
    growths,
    ratios,
  });
  const averageGrowths = calculateAverageGrowthRate(growths);
  const priceToFcf = ratios.map((r) => ({
    year: new Date(r.date).getFullYear(),
    priceToFCF: r.priceToFreeCashFlowsRatio,
  }));
  const quote = await quoteResp;
  if (quote.error || !quote.data) {
    throw new Error("Quote not found");
  }
  const todayPrice = quote.data.price;

  //3) display the result
  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          Discounted Cash Flow Analysis -
          <span className="tracking-normal px-2">{ticker.toUpperCase()}</span>
        </h1>
      </div>
      <DataTable
        data={averageGrowths}
        columns={growthMetricsColumnDef}
        orientation="horizontal"
        disableCopy
      />
      <PriceToFCFChart data={priceToFcf} />
      <div>
        <p>
          Intrinsic Value
          {valueToCurrency(intrinsicValue * (1 - 0.3), currency)}
        </p>
        <p>Today price {valueToCurrency(todayPrice, currency)}</p>
      </div>
      <SaveToDb
        ratios={ratios}
        growths={growths}
        financials={financials}
        symbol={ticker}
      />
      <Client
        defaultParams={defaultParams}
        initialIntrinsicValue={intrinsicValue}
        currency={currency}
      />
    </MaxWidthWrapper>
  );
};

export default DiscountedCashFlowAnalysisPage;
export const metadata = metadataHelper({
  title: "Discounted Cash Flow Analysis",
  description: "Discounted Cash Flow Analysis",
});
