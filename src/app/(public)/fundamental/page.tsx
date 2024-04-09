import { Fundamental } from "@/schema/stock/fundamental.schema";
import { config } from "@/lib/config";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import DataTable from "./components/data-table";
import { fundamentalColumns } from "./components/column-def";
import Client from "./components/client";

interface FundamentalPageProps {
  searchParams: {
    ticker?: string;
  };
}
const FundamentalPage = async ({ searchParams }: FundamentalPageProps) => {
  const ticker = searchParams.ticker ?? "AAPL";
  const fundamentals: Fundamental[] = [];
  const type = "annual"; // quarterly or annual
  try {
    const resp = await fetch(
      `${config.baseUrl}/api/stock/${ticker}/fundamental?type=${type}`
    );
    if (!resp.ok) {
      console.log(resp.ok, resp.status, resp.statusText);
      throw new Error("failed to fetch");
    }
    const data = (await resp.json()) as Fundamental[];
    data.forEach((f) => fundamentals.push({ ...f, date: new Date(f.date) }));
  } catch (err) {
    console.log("error in fetching data");
    console.error(err);
  }

  return (
    <MaxWidthWrapper className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tighter">{ticker}</h1>
      <DataTable
        columns={fundamentalColumns}
        data={fundamentals}
        orientation="horizontal"
      />
      <Client fundamentals={fundamentals} />
    </MaxWidthWrapper>
  );
};

export default FundamentalPage;
