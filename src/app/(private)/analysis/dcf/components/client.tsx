"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { valueToCurrency } from "@/lib/format";
import { Currency } from "@/lib/get-currency";
import { calculateIntrinsicValue } from "@/lib/stock/valuation";
import { useRef, useState } from "react";

interface ClientProps {
  defaultParams: {
    cashAndShortTermInvestments: number;
    discountRate: number;
    growthRateAssumption: number;
    latestFreeCashFlow: number;
    shareOutstanding: number;
    terminalPriceToFCF: number;
    totalLiabilities: number;
  };
  initialIntrinsicValue: number;
  currency: Currency;
}
const Client = ({
  defaultParams,
  initialIntrinsicValue,
  currency,
}: ClientProps) => {
  const discountedRateInputRef = useRef<HTMLInputElement>(null);
  const growthRateInputRef = useRef<HTMLInputElement>(null);
  const terminalPriceToFCFInputRef = useRef<HTMLInputElement>(null);
  const [intrinsicValue, setIntrinsicValue] = useState(initialIntrinsicValue);
  return (
    <div className="grid gap-6 w-[300px] grid-cols-1">
      <div className="grid grid-cols-2 items-center space-x-4">
        <Label>Discounted Rate</Label>
        <Input
          className="w-[200px]"
          ref={discountedRateInputRef}
          defaultValue={defaultParams.discountRate}
        />
      </div>
      <div className="grid grid-cols-2 items-center space-x-4">
        <Label>Growth Rate</Label>
        <Input
          className="w-[200px]"
          ref={growthRateInputRef}
          defaultValue={defaultParams.growthRateAssumption}
        />
      </div>
      <div className="grid grid-cols-2 items-center space-x-4">
        <Label>Terminal price-to-FCF</Label>
        <Input
          className="w-[200px]"
          ref={terminalPriceToFCFInputRef}
          defaultValue={defaultParams.terminalPriceToFCF}
        />
      </div>
      <Button
        className=""
        onClick={() => {
          const discountedRate = Number(discountedRateInputRef.current?.value);
          const growthRate = Number(growthRateInputRef.current?.value);
          const terminalPriceToFCF = Number(
            terminalPriceToFCFInputRef.current?.value
          );
          const val = calculateIntrinsicValue({
            ...defaultParams,
            discountRate: discountedRate,
            growthRateAssumption: growthRate,
            terminalPriceToFCF,
          });
          setIntrinsicValue(val);
        }}
      >
        Calculate
      </Button>

      <p>
        Intrinsic Value:{" "}
        <span>{valueToCurrency(intrinsicValue, currency)}</span>
      </p>
      <p>
        w 10% margin of safety:
        <span>{valueToCurrency(intrinsicValue * (1 - 0.1), currency)}</span>
      </p>
      <p>
        w 20% margin of safety:
        <span>{valueToCurrency(intrinsicValue * (1 - 0.2), currency)}</span>
      </p>
      <p>
        w 30% margin of safety:
        <span>{valueToCurrency(intrinsicValue * (1 - 0.3), currency)}</span>
      </p>
    </div>
  );
};

export default Client;
