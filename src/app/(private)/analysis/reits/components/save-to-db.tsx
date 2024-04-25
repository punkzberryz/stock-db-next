"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CompanyProfile,
  FinancialStatement,
  ReitsKeyMetrics,
} from "@prisma/client";
import { DividendResponse } from "@/schema/stock/dividend.schema";
import {
  saveMetricsToDbAction,
  saveReitsRatingToDbAction,
} from "../actions/save-to-db-action";
import { ReitsRatingResult } from "@/action/stock/reits";

interface SaveToDbProps {
  profile: CompanyProfile;
  financials: FinancialStatement[];
  reitsKeyMetrics: ReitsKeyMetrics[];
  dividends: DividendResponse;
}
const SaveToDb = ({
  dividends,
  financials,
  profile,
  reitsKeyMetrics,
}: SaveToDbProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSaveToDb = async () => {
    setIsLoading(true);
    const { error } = await saveMetricsToDbAction({
      dividends,
      financials,
      profile,
      reitsKeyMetrics,
    });
    setIsLoading(false);
    if (error) {
      console.error(error);
      toast.error("Failed to save to db");
      return;
    }
    toast.success("Saved to db");
  };
  return (
    <div>
      <Button disabled={isLoading} onClick={handleSaveToDb}>
        Save to db
      </Button>
    </div>
  );
};

interface SaveRatingToDbProps {
  rating: ReitsRatingResult;
  symbol: string;
}
const SaveRatingToDb = ({ rating, symbol }: SaveRatingToDbProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSaveToDb = async () => {
    setIsLoading(true);
    const { error } = await saveReitsRatingToDbAction({
      rating,
      symbol,
    });
    setIsLoading(false);
    if (error) {
      console.error(error);
      toast.error("Failed to save to db");
      return;
    }
    toast.success("Saved to db");
  };
  return (
    <Button disabled={isLoading} onClick={handleSaveToDb}>
      Save Rating to db
    </Button>
  );
};

export { SaveToDb, SaveRatingToDb };
