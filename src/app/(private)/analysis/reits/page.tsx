import MaxWidthWrapper from "@/components/max-width-wrapper";
import CompanyProfileDisplay from "@/components/stock/company-profile-display";
import { keyMetricsColumns } from "./components/table/keymetrics-column-def";
import { DividendChart, YearlyDividendChart } from "./components/charts";
import Client from "./components/client";
import ReitsRatingModel from "./components/reits-rating-model";
import DataTable from "@/components/Table/data-table";
import { formatDateString, valueToPercent } from "@/lib/format";
import { fundamentalColumns } from "./components/table/fundamental-column-def";
import {
  makeReitsFundamentalTableData,
  makeReitsKeymetricsTableData,
} from "./components/table/data";
import { getCurrencyFromSymbol } from "@/lib/get-currency";
import { fetchDataForReitsAnalysis } from "./actions/fetch-data";
import {
  calculateReitsRating,
  getReitsRatingsBySymbol,
} from "@/action/stock/reits";
import { makeDividendPerYear } from "@/action/stock/dividend-service";
import { fetchQuote } from "@/action/stock/quote-repo";
import SaveToDb from "@/components/save-to-db/save-to-db";
import { metadataHelper } from "@/lib/metadata";

interface ReitsAnalysisPageProps {
  searchParams: {
    ticker?: string;
  };
}
/*
  1) fetch data from db or api
  2) calculate values that we need
  3) display the result
*/
const ReitsAnalysisPage = async ({ searchParams }: ReitsAnalysisPageProps) => {
  const ticker = searchParams.ticker ?? "LHHOTEL.bk";
  const currency = getCurrencyFromSymbol(ticker);

  //1) fetch data from db or api

  const [reitsData, ratingData, quote] = await Promise.all([
    fetchDataForReitsAnalysis(ticker),
    getReitsRatingsBySymbol(ticker.toUpperCase()),
    fetchQuote(ticker),
  ]);
  const { dividends, financials, keymetrics, profile } = reitsData;
  const { ratings } = ratingData;
  if (!quote.data) {
    throw new Error("No data found");
  }
  //2) calculate values that we need
  const yearlyDividends = makeDividendPerYear(dividends.dividends);
  const dividendsChartData = dividends.dividends.map((d) => ({
    year: d.date,
    dividend: d.dividend,
  }));
  const fundamentalTable = makeReitsFundamentalTableData(financials, currency);
  const keyMetricsTable = makeReitsKeymetricsTableData(keymetrics, currency);
  const todayPrice = quote.data.price;
  const reitsRating = calculateReitsRating({ keymetrics, todayPrice });

  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          Reits Analysis -
          <span className="tracking-normal px-2">{profile.symbol}</span>
        </h1>
        {/* <h2 className="text-lg text-gray-500">{profile.companyName}</h2> */}
      </div>
      <CompanyProfileDisplay profile={profile} currency={currency} />
      {/* Fundamental Table */}
      <DataTable
        columns={fundamentalColumns}
        data={fundamentalTable}
        orientation="horizontal"
      />
      {/* Analysis Table */}
      <DataTable
        columns={keyMetricsColumns}
        data={keyMetricsTable}
        orientation="horizontal"
      />
      <YearlyDividendChart data={yearlyDividends} />
      <DividendChart data={dividendsChartData} />
      <ReitsRatingModel model={reitsRating} symbol={profile.symbol} />
      <SaveToDb
        dividends={dividends}
        financials={financials}
        reitsKeyMetrics={keymetrics}
        profile={profile}
        symbol={profile.symbol}
        reitsRating={reitsRating}
      />

      {ratings && ratings.length ? (
        <div>
          <p>Previous rating</p>
          {ratings.map((r) => (
            <div key={r.id} className="w-fit">
              <div className="grid grid-cols-2">
                <p className="px-2 text-gray-500">Score</p>
                <p className="text-right">
                  {valueToPercent(r.score / r.maxScore)}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p className="px-2 text-gray-500">Recorded Date</p>
                <p className="text-right">{formatDateString(r.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <Client />
    </MaxWidthWrapper>
  );
};

export default ReitsAnalysisPage;
export const metadata = metadataHelper({
  title: "Reits Analysis",
  description: "Reits Analysis",
});
