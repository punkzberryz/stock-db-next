"use client";

import { Button } from "@/components/ui/button";
import {
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
} from "@prisma/client";
import { saveToDbAction } from "../actions/save-to-db-action";
import toast from "react-hot-toast";

interface SaveToDbProps {
  ratios: FinancialRatio[];
  growths: FinancialGrowthRate[];
  financials: FinancialStatement[];
}
const SaveToDb = ({ financials, growths, ratios }: SaveToDbProps) => {
  const onClick = async () => {
    const { error } = await saveToDbAction({ financials, growths, ratios });
    if (error) {
      toast.error("Failed to save data to db");
      return;
    }
    toast.success("Save to db success!");
  };
  return (
    <div>
      <Button onClick={onClick}>Save data to dB</Button>
    </div>
  );
};

export default SaveToDb;
