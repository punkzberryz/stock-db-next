import { Fundamental } from "@/schema/stock/fundamental.schema";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import DataTable from "./components/data-table";
import { fundamentalColumns } from "./components/column-def";
import Client from "./components/client";
import { getFundamental, getInfo } from "@/action/stock";
import { Info } from "@/schema/stock/info.schema";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";
import { getSessionId } from "@/lib/auth";

interface FundamentalPageProps {
  searchParams: {
    ticker?: string;
    periodType?: string;
  };
}
const FundamentalPage = async ({ searchParams }: FundamentalPageProps) => {
  const sessionId = getSessionId();
  if (!sessionId) {
    throw new UnauthorizedError("unauthorized");
  }

  const ticker = searchParams.ticker ?? "AAPL";
  const fundamentals: Fundamental[] = [];
  let stcokInfo: Info | undefined;
  let periodType: "quarterly" | "annual" | undefined;

  if (
    searchParams.periodType === "quarterly" ||
    searchParams.periodType === "annual"
  ) {
    periodType = searchParams.periodType;
  }

  try {
    const [fundResp, infoResp] = await Promise.all([
      getFundamental({ ticker, periodType, sessionId }),
      getInfo({ ticker, sessionId }),
    ]);

    fundResp.forEach((f) =>
      fundamentals.push({ ...f, date: new Date(f.date) })
    );
    stcokInfo = infoResp;
  } catch (err) {
    console.error(err);
    throw new BadRequestError("Error in fetching data");
  }

  if (!stcokInfo) {
    throw new BadRequestError("Stock info not found");
  }

  return (
    <MaxWidthWrapper className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          {stcokInfo.symbol.toUpperCase()}
        </h1>
        <h2 className="text-lg text-gray-500">{stcokInfo.longName}</h2>
      </div>
      <div>
        <div className="flex space-x-2 items-center">
          <Label>market cap</Label>
          <span>
            {formatCurrency(stcokInfo.marketCap, { maximumFractionDigits: 1 })}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <Label>Share outstanding</Label>
          <span>
            {formatCurrency(stcokInfo.sharesOutstanding, {
              style: "decimal",
            })}
          </span>
        </div>
      </div>
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
