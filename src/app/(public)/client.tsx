"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fundamental } from "@/schema/stock/fundamental.schema";
const Client = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = async () => {
    const value = inputRef.current?.value;
    if (value === "" || !value) return;
    const response = await fetch(`/api/stock/${value}/fundamental`);
    const data = (await response.json()) as Fundamental[];
    const fundamentalResp = data.map((f) => ({ ...f, date: new Date(f.date) }));

    setFundamentals(fundamentalResp);
  };
  const [fundamentals, setFundamentals] = React.useState<Fundamental[]>([]);

  return (
    <div className="flex flex-col gap-8">
      <Input ref={inputRef} />
      <Button onClick={handleClick}>click</Button>
      <div className="flex gap-4">
        {fundamentals.map((fundamental, idx) => (
          <div key={idx}>
            <div className="grid grid-cols-2">
              <h2>{fundamental.date.toDateString()}</h2>
            </div>
            <Row label="Revenue" value={fundamental.totalRevenue} />
            <Row label="Net Income" value={fundamental.netIncome} />
            <Row
              label="Operating Cash Flow"
              value={fundamental.operatingCashFlow}
            />
            <Row
              label="Capital Expenditure"
              value={fundamental.capitalExpenditure}
            />
            <Row label="Free Cash Flow" value={fundamental.freeCashFlow} />
            <Row label="Total Assets" value={fundamental.totalAssets} />
            <Row label="Current Assets" value={fundamental.currentAssets} />
            <Row
              label="Total Non Current Assets"
              value={fundamental.totalNonCurrentAssets}
            />
            <Row label="Cash Financial" value={fundamental.cashFinancial} />
            <Row
              label="Total Liabilities Net Minority Interest"
              value={fundamental.totalLiabilitiesNetMinorityInterest}
            />
            <Row label="Current Debt" value={fundamental.currentDebt} />
            <Row label="Long Term Debt" value={fundamental.longTermDebt} />
            <Row
              label="Common Stock Equity"
              value={fundamental.commonStockEquity}
            />
            <Row
              label="Stockholders Equity"
              value={fundamental.stockholdersEquity}
            />
            <Row label="Diluted EPS" value={fundamental.dilutedEPS} />
            <Row label="EBITDA" value={fundamental.ebitda} />
            <Row label="Invested Capital" value={fundamental.investedCapital} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Row = ({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) => {
  return (
    <div className="grid grid-cols-2">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default Client;
