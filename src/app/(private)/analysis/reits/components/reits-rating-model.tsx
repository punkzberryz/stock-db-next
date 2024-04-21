import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { valueToPercent } from "@/lib/format";
import { calculateReitsRating } from "./make-data";
import { SaveRatingToDb } from "./save-to-db";
import { Separator } from "@/components/ui/separator";

interface ReitsRatingModelProps {
  fundamentals: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["financials"];
  keymetrics: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["reitsKeyMetrics"];
  todayPrice: number;
  symbol: string;
}
const ReitsRatingModel = ({
  keymetrics,
  todayPrice,
  symbol,
}: ReitsRatingModelProps) => {
  const {
    score,
    maxScore,
    dividendGainOver5Years,
    latestPriceToBook,
    priceGainOver5Years,
    priceToBookAverage,
    ratingCriteria,
  } = calculateReitsRating({ keymetrics, todayPrice });

  return (
    <div>
      {ratingCriteria.map((c, i) => (
        <div key={i}>
          <p className="text-gray-500">
            {i + 1}. {c.question}
          </p>
          <p>
            {c.score.toFixed(2)} / {c.maxScore}
          </p>
        </div>
      ))}
      {/* Total Score */}
      <div className="py-6 flex gap-4 h-24">
        <div>
          <p className="text-gray-500">Total Score</p>
          <p>
            {score.toFixed(2)} / {maxScore}
          </p>
        </div>
        <Separator orientation="vertical" />
        <div>
          <p className="text-gray-500">Rating</p>
          <p>{valueToPercent(score / maxScore)} %</p>
        </div>
      </div>
      <SaveRatingToDb
        ratingCriteria={ratingCriteria}
        score={score}
        maxScore={maxScore}
        symbol={symbol}
      />
    </div>
  );
};

export default ReitsRatingModel;
