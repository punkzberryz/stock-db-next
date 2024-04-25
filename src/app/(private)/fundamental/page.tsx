import MaxWidthWrapper from "@/components/max-width-wrapper";
import { metadataHelper } from "@/lib/metadata";
import PageWithoutTicker from "./components/page-without-ticker";
import CompanyProfileDisplay from "@/components/stock/company-profile-display";
import { getCurrencyFromSymbol } from "@/lib/get-currency";
import { fetchDataForFundamental } from "./actions/fetch-data";
import DataTable from "@/components/Table/data-table";
import { makeFundamentalTableData } from "./components/table/data";
import { fundamentalColumns } from "./components/table/fundamental-column-def";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SearchForStockInput from "@/components/search-for-stock";

interface FundamentalPageProps {
  searchParams: {
    ticker?: string;
    periodType?: string;
  };
}
const URL = "/fundamental";
const FundamentalPage = async ({ searchParams }: FundamentalPageProps) => {
  const ticker = searchParams.ticker;
  if (!ticker) {
    return <PageWithoutTicker url={URL} />;
  }
  const currency = getCurrencyFromSymbol(ticker);

  //1) Get all required results from database or api
  const [] = await Promise.all([]);
  const { profile, financials } = await fetchDataForFundamental(ticker);
  //2) calculate values that we need
  const fundamentalTable = makeFundamentalTableData(financials, currency);
  //3) display the result

  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          Stock Fundamental {profile.symbol}
        </h1>
      </div>
      <CompanyProfileDisplay profile={profile} currency={currency} />
      {/* Fundamental Table */}
      <DataTable
        data={fundamentalTable}
        columns={fundamentalColumns}
        orientation="horizontal"
      />
      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        <Link
          href={`/analysis/dcf?ticker=${ticker}`}
          className={buttonVariants({
            variant: "default",
            className: "w-fit ml-auto",
          })}
        >
          DCF Analysis
        </Link>
        <SearchForStockInput url={URL} />
      </div>
    </MaxWidthWrapper>
  );
};

export default FundamentalPage;
export const metadata = metadataHelper({
  title: "Stock Fundamental",
  description: "Stock fundamental",
});
