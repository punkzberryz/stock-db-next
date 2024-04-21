import MaxWidthWrapper from "@/components/max-width-wrapper";
import CompanyProfileDisplay from "@/components/stock/company-profile-display";
import { BadRequestError } from "@/lib/error";
import React from "react";
import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { keyMetricsColumns } from "./components/table/keymetrics-column-def";
import { makeDividendPerYear } from "@/action/stock";
import { DividendChart, YearlyDividendChart } from "./components/charts";
import Client from "./components/client";
import ReitsRatingModel from "./components/reits-rating-model";
import { SaveToDb } from "./components/save-to-db";
import {
  getReitsAnalysisResultsFromDb,
  getReitsRatingsBySymbol,
} from "@/action/stock/stock-action/reits-analysis";
import { makeReitsAnalysisDataFromDb } from "./components/make-data";
import DataTable from "@/components/Table/data-table";
import { formatDateString, valueToPercent } from "@/lib/format";
import CopyTableToClipboard from "./components/copy-table-to-clipboard";
import { fundamentalColumns } from "./components/table/fundamental-column-def";
import {
  makeReitsFundamentalTableData,
  makeReitsKeymetricsTableData,
} from "./components/table/data";

interface ReitsAnalysisPageProps {
  searchParams: {
    ticker?: string;
  };
}

const ReitsAnalysisPage = async ({ searchParams }: ReitsAnalysisPageProps) => {
  const ticker = searchParams.ticker ?? "LHHOTEL.bk";
  const dbResults = await getReitsAnalysisResultsFromDb(ticker);
  if (dbResults.error) {
    throw new BadRequestError("Failed to fetch data");
  }

  let profile: Awaited<ReturnType<typeof fmpApi.getProfile>> | undefined;
  let keymetrics:
    | Awaited<ReturnType<typeof fmpApi.getReitsKeyMetrics>>
    | undefined;
  let dividends: Awaited<ReturnType<typeof fmpApi.getDividends>> | undefined;
  let isDbData = false;
  const dbData = makeReitsAnalysisDataFromDb(dbResults);
  if (!dbData.profile) {
    // data not found, fetch from api
    try {
      const [profileResp, keymetricsResp, dividendResp] = await Promise.all([
        fmpApi.getProfile(ticker),
        fmpApi.getReitsKeyMetrics(ticker),
        fmpApi.getDividends(ticker),
      ]);
      profile = profileResp;
      keymetrics = keymetricsResp;
      dividends = dividendResp;
      console.log("fetching data from api complete");
    } catch (err) {
      console.error(err);
      throw new BadRequestError("Failed to fetch data");
    }
  } else {
    // data found in db
    profile = dbData.profile;
    keymetrics = dbData.keymetrics;
    dividends = dbData.dividends;
    isDbData = true;
    console.log("fetching data from db complete");
  }

  if (!profile || !keymetrics || !dividends) {
    return <MaxWidthWrapper>Not found...</MaxWidthWrapper>;
  }
  const yearlyDividends = makeDividendPerYear(dividends);
  const todayPrice = profile.price;

  const { ratings } = await getReitsRatingsBySymbol(ticker.toUpperCase());
  const fundamentalTable = makeReitsFundamentalTableData(keymetrics.financials);
  const keyMetricsTable = makeReitsKeymetricsTableData(
    keymetrics.reitsKeyMetrics
  );
  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          Reits Analysis -
          <span className="tracking-normal px-2">{profile.symbol}</span>
        </h1>
        {/* <h2 className="text-lg text-gray-500">{profile.companyName}</h2> */}
      </div>
      <CompanyProfileDisplay profile={profile} />
      {/* Fundamental Table */}
      <DataTable
        columns={fundamentalColumns}
        data={fundamentalTable}
        orientation="horizontal"
      />
      <CopyTableToClipboard data={keymetrics.financials} />
      {/* Analysis Table */}
      <DataTable
        columns={keyMetricsColumns}
        data={keyMetricsTable}
        orientation="horizontal"
      />
      <YearlyDividendChart data={yearlyDividends} />
      <DividendChart
        data={dividends.map((d) => ({ year: d.date, dividend: d.dividend }))}
      />
      <ReitsRatingModel
        todayPrice={todayPrice}
        fundamentals={keymetrics.financials}
        keymetrics={keymetrics.reitsKeyMetrics}
        symbol={profile.symbol}
      />
      <Client />
      {isDbData ? null : (
        <SaveToDb
          profile={profile}
          financials={keymetrics.financials}
          reitsKeyMetrics={keymetrics.reitsKeyMetrics}
          dividends={dividends}
        />
      )}
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
    </MaxWidthWrapper>
  );
};

export default ReitsAnalysisPage;
