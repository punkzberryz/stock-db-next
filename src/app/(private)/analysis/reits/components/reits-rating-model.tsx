import { valueToPercent } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import { ReitsRatingResult } from "@/action/stock/reits";

interface ReitsRatingModelProps {
  model: ReitsRatingResult;
  symbol: string;
}
const ReitsRatingModel = ({ model, symbol }: ReitsRatingModelProps) => {
  const {
    score,
    maxScore,
    dividendGainOver5Years,
    latestPriceToBook,
    priceGainOver5Years,
    priceToBookAverage,
    ratingCriteria,
  } = model;

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
    </div>
  );
};

export default ReitsRatingModel;
