import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import { valueToPercent } from "@/lib/format";
import { calculateReitsRating } from "./make-data";

interface ReitsRatingModelProps {
  fundamentals: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["financials"];
  keymetrics: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["reitsKeyMetrics"];
  todayPrice: number;
}
const ReitsRatingModel = ({
  keymetrics,
  todayPrice,
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
      <div className="mt-10">
        <p>P/B 5 Year Avg {priceToBookAverage.toFixed(2)}</p>
        <p>Today P/B {latestPriceToBook.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-gray-500">Price Gain over 5 years period</p>
        <p>{valueToPercent(priceGainOver5Years)}</p>
      </div>
      <div>
        <p className="text-gray-500">Dividend Gain over 5 years period</p>
        <p>{valueToPercent(dividendGainOver5Years)}</p>
      </div>
      {/* Total Score */}
      <div>
        <p className="text-gray-500">Total Score</p>
        <p>
          {score.toFixed(2)} / {maxScore}
        </p>
        <p className="text-gray-500">Rating</p>
        <p>{valueToPercent(score / maxScore)} %</p>
      </div>
    </div>
  );
};

export default ReitsRatingModel;
