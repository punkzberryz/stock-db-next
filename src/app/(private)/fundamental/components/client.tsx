"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDateString } from "@/lib/format";
import { Fundamental } from "@/schema/stock/fundamental.schema";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CSVLink } from "react-csv";
interface ClientProps {
  fundamentals: Fundamental[];
}
const Client = ({ fundamentals }: ClientProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const csvData = useMemo(() => convertToCSVData(fundamentals), [fundamentals]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleGetFundamental = () => {
    if (!inputRef.current?.value) return;
    if (inputRef.current?.value.trim() === "") return;
    router.push(`/fundamental?ticker=${inputRef.current?.value}`);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="flex flex-col gap-6">
      <Button asChild>
        <CSVLink data={csvData}>Export to CSV</CSVLink>
      </Button>
      <div className="flex gap-4 items-center">
        <Label>Stock Ticker</Label>
        <Input ref={inputRef} placeholder="SICT.BK" />
        <Button onClick={handleGetFundamental}>Get Fundamental</Button>
      </div>
    </div>
  );
};

const convertToCSVData = (data: Fundamental[]) => {
  const csvData = data.map((f) => [
    f.date,
    f.revenue,
    f.netIncome,
    f.operatingCashFlow,
    f.capitalExpenditure,
    f.freeCashFlow,
    f.totalAssets,
    f.nonCurrentAssets,
    f.cashFinancial,
    f.totalLiabilities,
    f.currentDebt,
    f.longTermDebt,
    f.commonStockEquity,
    f.stockholdersEquity,
    f.dilutedEPS,
    f.ebitda,
    f.investedCapital,
    f.currentAssets,
  ]);
  const headers = [
    "Date",
    "Revenue",
    "Net Income",
    "Operating Cash Flow",
    "Capital Expenditure",
    "Free Cash Flow",
    "Total Assets",
    "Non Current Assets",
    "Cash",
    "Total Liabilities",
    "Current Debt",
    "Long Term Debt",
    "Common Stock Equity",
    "Stockholder Equity",
    "Diluted EPS",
    "EBITDA",
    "Invested Capital",
    "Current Assets",
  ];
  const csvHorizontalData = [...csvData];
  // Transpose the data
  const csvVerticalData: (string | number | Date | undefined)[][] = [];
  headers.forEach((header) => {
    csvVerticalData.push([header]);
  });
  csvHorizontalData.forEach((row, i) => {
    row.forEach((call, j) => {
      if (call instanceof Date) {
        csvVerticalData[j].push(formatDateString(call));
      } else {
        csvVerticalData[j].push(call);
      }
    });
  });

  return csvVerticalData;
};

export default Client;
