import { getInfo, getPrice, getReitsFundamental } from "@/action/stock";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Label } from "@/components/ui/label";
import { getSessionId } from "@/lib/auth";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { formatCurrency, formatDateString } from "@/lib/format";
import { ReitsFundamental } from "@/schema/stock/fundamental.schema";
import { Info } from "@/schema/stock/info.schema";
import DataTable from "../components/data-table";
import {
  ReitsAnalysis,
  reitsAnalysisColumns,
  reitsFundamentalColumns,
} from "./components/column-def";
import DividendChart from "./components/dividend-chart";
import Client from "./components/client";
interface FundamentalPageProps {
  searchParams: {
    ticker?: string;
    periodType?: string;
  };
}
const ReitsFundamentalPage = async ({ searchParams }: FundamentalPageProps) => {
  const sessionId = getSessionId();
  if (!sessionId) {
    throw new UnauthorizedError("unauthorized");
  }

  const ticker = searchParams.ticker ?? "LHHOTEL.bk";
  const fundamentals: ReitsFundamental[] = [];
  const analysis: ReitsAnalysis[] = [];
  let dividends: Awaited<ReturnType<typeof getPrice>>["dividends"] = new Map();
  let dividendsData: {
    date: Date;
    dividend: number;
  }[];
  let dividendsPerYear: Record<number, number> = {};
  let stcokInfo: Info | undefined;
  let periodType: "quarterly" | "annual" | undefined;

  if (
    searchParams.periodType === "quarterly" ||
    searchParams.periodType === "annual"
  ) {
    periodType = searchParams.periodType;
  }
  try {
    const [fundResp, infoResp, priceResp] = await Promise.all([
      getReitsFundamental({ ticker, periodType, sessionId }),
      getInfo({ ticker, sessionId }),
      getPrice({ ticker, sessionId }),
    ]);

    fundResp.forEach((f) => {
      const date = formatDateString(f.date, { excludeDay: true });
      // const price = priceResp.quotes[date];
      const price = priceResp.quotes.get(date);
      return fundamentals.push({
        ...f,
        date: new Date(f.date),
        price: price?.close,
      });
    });

    dividends = priceResp.dividends;
    dividendsData = Array.from(dividends).map(([date, dividend]) => ({
      date: dividend.date,
      dividend: dividend.amount,
    }));

    dividendsPerYear = dividendsData.reduce((acc, d) => {
      const year = d.date.getFullYear();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += d.dividend;
      return acc;
    }, {} as Record<number, number>);

    // basic analysis
    for (let i = 0; i < fundamentals.length; i++) {
      const f = fundamentals[i];
      const propertyYield =
        f.netIncome && f.nonCurrentAssets
          ? f.netIncome / f.nonCurrentAssets
          : undefined;
      let costOfDebt: number | undefined;
      if (f.totalDebt && f.interestExpense) {
        costOfDebt = f.interestExpense / f.totalDebt;
      }
      let netProfitGrowRate: number | undefined;
      if (i > 0 && f.netIncome) {
        const prevNetIncome = fundamentals[i - 1].netIncome;
        if (prevNetIncome) {
          netProfitGrowRate =
            (f.netIncome - prevNetIncome) / Math.abs(prevNetIncome);
        }
      }
      let gearingRatio: number | undefined;
      if (f.totalDebt && f.totalAssets) {
        gearingRatio = f.totalDebt / f.totalAssets;
      }
      let netProfitMargin: number | undefined;
      if (f.netIncome && f.revenue) {
        netProfitMargin = f.netIncome / f.revenue;
      }
      let priceToBook: number | undefined;
      if (f.price && f.stockholdersEquity && f.ordinarySharesNumber) {
        const bookValue = f.stockholdersEquity / f.ordinarySharesNumber;
        priceToBook = f.price / bookValue;
      }
      let priceToEarning: number | undefined;
      if (f.price && f.netIncome && f.ordinarySharesNumber) {
        priceToEarning = f.price / (f.netIncome / f.ordinarySharesNumber);
      }
      let dividendGrowRate: number | undefined;
      const year = f.date.getFullYear();
      if (dividendsPerYear[year - 1] && dividendsPerYear[year]) {
        dividendGrowRate =
          (dividendsPerYear[year] - dividendsPerYear[year - 1]) /
          Math.abs(dividendsPerYear[year - 1]);
      }
      let dividendYield: number | undefined;

      if (f.price && dividendsPerYear[year]) {
        dividendYield = dividendsPerYear[year] / f.price;
      }
      analysis.push({
        date: f.date,
        propertyYield,
        costOfDebt,
        netProfitGrowRate,
        gearingRatio,
        netProfitMargin,
        divided: dividendsPerYear[year],
        priceToBook,
        priceToEarning,
        dividendGrowRate,
        dividendYield,
      });
    }

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
        columns={reitsFundamentalColumns}
        data={fundamentals}
        orientation="horizontal"
      />
      <p>Basic analysis</p>
      <DataTable
        columns={reitsAnalysisColumns}
        data={analysis}
        orientation="horizontal"
      />
      <p>Dividends</p>
      <DividendChart data={dividendsPerYear} />
      <Client />
    </MaxWidthWrapper>
  );
};

export default ReitsFundamentalPage;