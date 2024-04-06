import { Separator } from "@/components/ui/separator";
import { Fundamental } from "@/schema/stock/fundamental.schema";
import { format } from "date-fns";
interface FundamentalTableProps {
  fundamentals: Fundamental[];
}
const FundamentalTable = ({ fundamentals }: FundamentalTableProps) => {
  return (
    <div className="flex">
      <FundamentalColumnName />
      <div className="flex-1 grid grid-cols-4">
        {fundamentals.map((fundamental, index) => (
          <FundamentalColumn key={index} fundamental={fundamental} />
        ))}
      </div>
    </div>
  );
};

export default FundamentalTable;
const FundamentalColumnName = () => {
  return (
    <div className="grid grid-cols-1 text-wrap w-[200px] pr-10">
      <h2>Date</h2>
      <CellName value="Total Revenue (M)" />
      <CellName value="Net Income" />
      <CellName value="Operating Cash Flow" />
      <CellName value="Capital Expenditure" />
      <CellName value="Free Cash Flow" />
      <CellName value="Total Assets" />
      <CellName value="Non Current Assets" />
      <CellName value="Cash Financial" />
      <CellName value="Total Liabilities" />
      <CellName value="Current Debt" />
      <CellName value="Long Term Debt" />
      <CellName value="Common Stock Equity" />
      <CellName value="Stockholders Equity" />
      <CellName value="Diluted EPS" />
      <CellName value="EBITDA" />
      <CellName value="Invested Capital" />
    </div>
  );
};

const FundamentalColumn = ({ fundamental }: { fundamental: Fundamental }) => {
  const date = format(fundamental.date, "yyyy-MM-dd");
  return (
    <div className="grid grid-cols-1 w-[100px] truncate">
      <h2>{date}</h2>
      <Cell value={fundamental.revenue} />
      <Cell value={fundamental.netIncome} />
      <Cell value={fundamental.operatingCashFlow} />
      <Cell value={fundamental.capitalExpenditure} />
      <Cell value={fundamental.freeCashFlow} />
      <Cell value={fundamental.totalAssets} />
      <Cell value={fundamental.nonCurrentAssets} />
      <Cell value={fundamental.cashFinancial} />
      <Cell value={fundamental.totalLiabilities} />
      <Cell value={fundamental.currentDebt} />
      <Cell value={fundamental.longTermDebt} />
      <Cell value={fundamental.commonStockEquity} />
      <Cell value={fundamental.stockholdersEquity} />
      <Cell value={fundamental.dilutedEPS} />
      <Cell value={fundamental.ebitda} />
      <Cell value={fundamental.investedCapital} />
    </div>
  );
};

const CellName = ({ value }: { value: string }) => {
  return <p className="h-10">{value}</p>;
};

const Cell = ({ value }: { value: number | undefined }) => {
  let val = value?.toFixed(2);
  if (value && value > 1000) val = value?.toPrecision(2);
  return (
    <div className="h-10">
      {val ?? "-"}
      <Separator />
    </div>
  );
};
