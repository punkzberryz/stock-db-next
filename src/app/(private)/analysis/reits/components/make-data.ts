import { getReitsAnalysisResultsFromDb } from "@/action/stock/stock-action/reits-analysis";
import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";

export const makeReitsAnalysisDataFromDb = ({
  dividends,
  financials,
  profile,
  reitsKeyMetrics,
}: Awaited<ReturnType<typeof getReitsAnalysisResultsFromDb>>) => {
  if (!profile || !financials || !reitsKeyMetrics || !dividends) {
    return {};
  }
  // data found in db
  const profileResult = {
    ...profile,
    dcf: profile.dcf ?? 0,
    dcfDiff: profile.dcfDiff ?? 0,
    image: profile.image ?? "",
  };
  const keymetricsResult = {
    financials: financials.map((f) => ({
      ...f,
      date: f.date.toISOString(),
    })),
    reitsKeyMetrics: reitsKeyMetrics.map((r) => ({
      ...r,
      date: r.date.toISOString(),
      revenueGrowth: r.revenueGrowth ?? undefined,
      bookValuePerShareGrowth: r.bookValuePerShareGrowth ?? undefined,
      dividendGrowth: r.dividendGrowth ?? undefined,
      netProfitGrowth: r.netProfitGrowth ?? undefined,
      priceToBookGrowth: r.priceToBookGrowth ?? undefined,
    })),
  };
  const dividendsResult: {
    date: string;
    dividend: number;
  }[] = [];
  if (dividends) {
    dividends.date.forEach((d, index) => {
      dividendsResult.push({
        date: d,
        dividend: dividends?.dividend[index] ?? 0,
      });
    });
  }
  return {
    profile: profileResult,
    keymetrics: keymetricsResult,
    dividends: dividendsResult,
  };
};

const distanceToScore = (ref: number, value: number) => {
  if (value >= ref) {
    //We give full score if the value is greater than or equal to the reference
    return 1;
  }
  return value / ref; //We give partial score if the value is less than the reference
};

export const calculateReitsRating = ({
  keymetrics,
  todayPrice,
}: {
  keymetrics: Awaited<
    ReturnType<typeof fmpApi.getReitsKeyMetrics>
  >["reitsKeyMetrics"];
  todayPrice: number;
}) => {
  const numOfYears = keymetrics.length;
  const latestBookValuePerShare =
    keymetrics[keymetrics.length - 1].price /
    keymetrics[keymetrics.length - 1].priceToBook;
  const latestPriceToBook = latestBookValuePerShare / todayPrice;

  //Consolidate Reits Key Metrics
  const answer = keymetrics.reduce(
    (acc, metricsValue, index) => {
      const propertyYieldIsBetween4And5 =
        metricsValue.propertyYield * 100 > 4 ? 1 : 0;
      let revenueGrowthIsPositive = 0;
      if (metricsValue?.revenueGrowth) {
        revenueGrowthIsPositive = metricsValue.revenueGrowth > 0 ? 1 : 0;
      }
      let profitGrowthIsPositive = 0;
      if (metricsValue?.netProfitGrowth) {
        profitGrowthIsPositive = metricsValue.netProfitGrowth > 0 ? 1 : 0;
      }
      let dividendGrowthIsPositive = 0;
      if (metricsValue?.dividendGrowth) {
        dividendGrowthIsPositive = metricsValue.dividendGrowth > 0 ? 1 : 0;
      }
      let gearingRatioLessThan40 = 0;
      // Gearing ratio less than 40%
      if (metricsValue.gearingRatio <= 0.4) {
        gearingRatioLessThan40 = 1;
      } else if (
        // Gearing ratio between 40% and 42%
        metricsValue.gearingRatio > 0.4 &&
        metricsValue.gearingRatio <= 0.42
      ) {
        gearingRatioLessThan40 = 0.5;
      } else if (
        // Gearing ratio between 42% and 45%
        metricsValue.gearingRatio > 0.42 &&
        metricsValue.gearingRatio <= 0.45
      ) {
        gearingRatioLessThan40 = 0.25;
      }

      metricsValue.gearingRatio < 0.4 ? 1 : 0;
      const spreadYieldIsAtLeast2 = metricsValue.yieldSpread >= 0.02 ? 1 : 0;
      let bookValuePerShareGrowthIsPositive = 0;
      if (metricsValue?.bookValuePerShareGrowth) {
        bookValuePerShareGrowthIsPositive =
          metricsValue.bookValuePerShareGrowth > 0 ? 1 : 0;
      }
      const dividendYieldIsBetween4And5 =
        metricsValue.dividendYield >= 0.04 ? 1 : 0;
      return {
        propertyYieldIsBetween4And5:
          acc.propertyYieldIsBetween4And5 + propertyYieldIsBetween4And5,
        revenueGrowthIsConsistent:
          acc.revenueGrowthIsConsistent + revenueGrowthIsPositive,
        profitGrowthIsConsistent:
          acc.profitGrowthIsConsistent + profitGrowthIsPositive,
        dividendGrowthIsConsistent:
          acc.dividendGrowthIsConsistent + dividendGrowthIsPositive,
        gearingRatioLessThan40:
          acc.gearingRatioLessThan40 + gearingRatioLessThan40,
        spreadYieldIsAtLeast2:
          acc.spreadYieldIsAtLeast2 + spreadYieldIsAtLeast2,
        bookValuePerShareGrowthIsConsistent:
          acc.bookValuePerShareGrowthIsConsistent +
          bookValuePerShareGrowthIsPositive,
        priceToBookAverage: acc.priceToBookAverage + metricsValue.priceToBook,
        dividendYieldIsBetween4And5:
          acc.dividendYieldIsBetween4And5 + dividendYieldIsBetween4And5,
      };
    },
    {
      propertyYieldIsBetween4And5: 0,
      revenueGrowthIsConsistent: 0,
      profitGrowthIsConsistent: 0,
      dividendGrowthIsConsistent: 0,
      gearingRatioLessThan40: 0,
      spreadYieldIsAtLeast2: 0,
      bookValuePerShareGrowthIsConsistent: 0,
      dividendYieldIsBetween4And5: 0,
      priceToBookAverage: 0,
    } as {
      propertyYieldIsBetween4And5: number;
      revenueGrowthIsConsistent: number;
      profitGrowthIsConsistent: number;
      dividendGrowthIsConsistent: number;
      gearingRatioLessThan40: number;
      spreadYieldIsAtLeast2: number;
      bookValuePerShareGrowthIsConsistent: number;
      dividendYieldIsBetween4And5: number;
      priceToBookAverage: number;
    }
  );
  answer.propertyYieldIsBetween4And5 =
    answer.propertyYieldIsBetween4And5 / numOfYears;
  answer.revenueGrowthIsConsistent =
    answer.revenueGrowthIsConsistent / (numOfYears - 1);
  answer.profitGrowthIsConsistent =
    answer.profitGrowthIsConsistent / (numOfYears - 1);
  answer.dividendGrowthIsConsistent =
    answer.dividendGrowthIsConsistent / (numOfYears - 1);
  answer.gearingRatioLessThan40 = answer.gearingRatioLessThan40 / numOfYears;
  answer.spreadYieldIsAtLeast2 = answer.spreadYieldIsAtLeast2 / numOfYears;
  answer.bookValuePerShareGrowthIsConsistent =
    answer.bookValuePerShareGrowthIsConsistent / (numOfYears - 1);
  answer.dividendYieldIsBetween4And5 =
    answer.dividendYieldIsBetween4And5 / numOfYears;
  answer.priceToBookAverage = answer.priceToBookAverage / numOfYears;

  const consistentGrowthScore =
    (answer.revenueGrowthIsConsistent +
      answer.profitGrowthIsConsistent +
      answer.dividendGrowthIsConsistent) /
    3;

  const priceToBookLessThan5YearAvgScore = distanceToScore(
    latestPriceToBook,
    answer.priceToBookAverage
  );

  const priceGainOver5Years =
    (keymetrics[numOfYears - 1].price - keymetrics[0].price) /
    keymetrics[0].price;
  const dividendGainOver5Years =
    (keymetrics[numOfYears - 1].dividend - keymetrics[0].dividend) /
    keymetrics[0].dividend;
  let dividendGainIsMoreThanPriceGain = distanceToScore(
    priceGainOver5Years,
    dividendGainOver5Years
  );
  if (dividendGainOver5Years < 0) {
    dividendGainIsMoreThanPriceGain = 0;
  }
  const score =
    answer.propertyYieldIsBetween4And5 +
    consistentGrowthScore +
    (answer.gearingRatioLessThan40 + answer.spreadYieldIsAtLeast2) / 2 +
    answer.bookValuePerShareGrowthIsConsistent +
    answer.dividendYieldIsBetween4And5 +
    priceToBookLessThan5YearAvgScore +
    dividendGainIsMoreThanPriceGain;

  return {
    score,
    maxScore: 7,
    priceGainOver5Years,
    dividendGainOver5Years,
    latestPriceToBook,
    priceToBookAverage: answer.priceToBookAverage,
    ratingCriteria: [
      {
        question: "Is Property Yield between 4% and 5%?",
        score: answer.propertyYieldIsBetween4And5,
        maxScore: 1,
      },
      {
        question:
          "Has the company shown consistent growth in Revenue, Profit and Dividend?",
        score: consistentGrowthScore,
        maxScore: 1,
      },
      {
        question:
          "Is Gearing ratio less than 40%? (1 point if < 40%, 0.5 if 40% to 42%, 0.25 if 42% to 45%)",
        score: answer.gearingRatioLessThan40,
        maxScore: 1,
      },
      {
        question:
          "Is Cost of debt less than property yield (spread of at least 2%)?",
        score: answer.spreadYieldIsAtLeast2,
        maxScore: 1,
      },
      {
        question: "Is there consistent growth in Book value per share?",
        score: answer.bookValuePerShareGrowthIsConsistent,
        maxScore: 1,
      },
      {
        question: "Is Dividend yield at least between 4% to 5%?",
        score: answer.dividendYieldIsBetween4And5,
        maxScore: 1,
      },
      {
        question: "Is Price to Book less than 5 year average?",
        score: priceToBookLessThan5YearAvgScore / 2,
        maxScore: 0.5,
      },
      {
        question: "Is Dividend Gain over 5 years period more than Price Gain?",
        score: dividendGainIsMoreThanPriceGain / 2,
        maxScore: 0.5,
      },
    ] as ReitsRatingCriteria[],
  };
};

interface ReitsRatingCriteria {
  question: string;
  score: number;
  maxScore: number;
}
