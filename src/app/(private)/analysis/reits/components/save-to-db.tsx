"use client";
import {
  createReitsAnalysisResults,
  createReitsRating,
} from "@/action/stock/stock-action/reits-analysis";
import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { calculateReitsRating } from "./make-data";

interface SaveToDbProps {
  profile: Awaited<ReturnType<typeof fmpApi.getProfile>>;
  financials: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["financials"];
  reitsKeyMetrics: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["reitsKeyMetrics"];
  dividends: Awaited<ReturnType<typeof fmpApi.getDividends>>;
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
    const { error } = await createReitsAnalysisResults({
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
  score: number;
  maxScore: number;
  ratingCriteria: ReturnType<typeof calculateReitsRating>["ratingCriteria"];
  symbol: string;
}
const SaveRatingToDb = ({
  maxScore,
  score,
  ratingCriteria,
  symbol,
}: SaveRatingToDbProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSaveToDb = async () => {
    setIsLoading(true);
    const { error } = await createReitsRating({
      maxScore,
      score,
      ratingCriteria,
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
