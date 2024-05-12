"use client";
import { DividendResponse } from "@/schema/stock/dividend.schema";
import {
  CompanyProfile,
  FinancialGrowthRate,
  FinancialRatio,
  FinancialStatement,
  ReitsKeyMetrics,
} from "@prisma/client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  saveFinancialGrowthRateToDb,
  saveFinancialRatioToDb,
  saveFinancialsToDb,
  ServerActionError,
  saveCompanyProfileToDb,
  saveReitsKeyMetricsToDb,
  saveDividendToDb,
  saveReitsRatingToDb,
} from "./save-to-db-action";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";
import { ReitsRatingResult } from "@/action/stock/reits";

interface SaveToDbProps {
  profile?: CompanyProfile;
  ratios?: FinancialRatio[];
  growths?: FinancialGrowthRate[];
  financials?: FinancialStatement[];
  reitsKeyMetrics?: ReitsKeyMetrics[];
  dividends?: DividendResponse;
  reitsRating?: ReitsRatingResult;
  symbol: string;
}

const SaveToDb = ({
  dividends,
  financials,
  growths,
  profile,
  ratios,
  reitsKeyMetrics,
  symbol,
  reitsRating,
}: SaveToDbProps) => {
  return (
    <div className="flex flex-col space-y-4 border rounded-xl p-4">
      <p>Save data to db</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {financials && (
          <SaveToDbButton
            title="Financials"
            uploadAction={() => saveFinancialsToDb(financials)}
          />
        )}
        {growths && (
          <SaveToDbButton
            title="Financial Growth Rate"
            uploadAction={() => saveFinancialGrowthRateToDb(growths)}
          />
        )}
        {ratios && (
          <SaveToDbButton
            title="Financial Ratios"
            uploadAction={() => saveFinancialRatioToDb(ratios)}
          />
        )}
        {profile && (
          <SaveToDbButton
            title="Company Profile"
            uploadAction={() => saveCompanyProfileToDb(profile)}
          />
        )}
        {reitsKeyMetrics && (
          <SaveToDbButton
            title="Reits Key Metrics"
            uploadAction={() => saveReitsKeyMetricsToDb(reitsKeyMetrics)}
          />
        )}
        {dividends && (
          <SaveToDbButton
            title="Dividends"
            uploadAction={() => saveDividendToDb(dividends)}
          />
        )}
      </ul>
      {reitsRating && (
        <>
          <Separator />
          <p>Save rating to db</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reitsRating && (
              <SaveToDbButton
                title="Reits Rating"
                uploadAction={() => saveReitsRatingToDb(reitsRating, symbol)}
              />
            )}
          </ul>
        </>
      )}
    </div>
  );
};

const SaveToDbButton = ({
  title,
  uploadAction,
}: {
  title: string;
  uploadAction: () => Promise<{ error?: ServerActionError }>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () => {
    setIsLoading(true);
    uploadAction()
      .then(({ error }) => {
        if (error) {
          toast.error(error.message);
        } else {
          toast.success(`${title} saved to db successfully!`);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error while uploading");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <li className="w-full">
      <Button onClick={onClick} className="w-full" disabled={isLoading}>
        {title}
      </Button>
    </li>
  );
};

export default SaveToDb;
