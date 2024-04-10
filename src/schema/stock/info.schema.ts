export type YahooQuoteResponse = {
  language: string;
  region: string;
  quoteType: string;
  typeDisp: string;
  quoteSourceName: string;
  triggerable: boolean;
  customPriceAlertConfidence: string;
  currency: string;
  marketState: string;
  regularMarketChangePercent: number;
  regularMarketPrice: number;
  exchange: string;
  shortName: string;
  longName: string;
  messageBoardId: string;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  market: string;
  esgPopulated: boolean;
  hasPrePostMarketData: boolean;
  firstTradeDateMilliseconds: Date;
  priceHint: number;
  regularMarketChange: number;
  regularMarketTime: Date;
  regularMarketDayHigh: number;
  regularMarketDayRange: {
    low: number;
    high: number;
  };
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  bid: number;
  ask: number;
  bidSize?: number;
  askSize?: number;
  fullExchangeName: string;
  financialCurrency: string;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: {
    low: number;
    high: number;
  };
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekChangePercent: number;
  dividendDate?: Date;
  earningsTimestamp?: Date;
  earningsTimestampStart?: Date;
  earningsTimestampEnd?: Date;
  trailingAnnualDividendRate: number;
  trailingPE: number;
  dividendRate: number;
  trailingAnnualDividendYield: number;
  dividendYield: number;
  epsTrailingTwelveMonths: number;
  epsForward?: number;
  epsCurrentYear?: number;
  priceEpsCurrentYear?: number;
  sharesOutstanding: number;
  bookValue: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  forwardPE?: number;
  priceToBook: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  averageAnalystRating: string;
  tradeable: boolean;
  cryptoTradeable: boolean;
  displayName?: string;
  symbol: string;
};

export type Info = {
  longName: string;
  fullExchangeName: string;
  symbol: string;
  marketCap: number;
  sharesOutstanding: number;
};

const example_sictBk: YahooQuoteResponse = {
  language: "en-US",
  region: "US",
  quoteType: "EQUITY",
  typeDisp: "Equity",
  quoteSourceName: "Delayed Quote",
  triggerable: false,
  customPriceAlertConfidence: "LOW",
  currency: "THB",
  marketState: "POSTPOST",
  regularMarketChangePercent: 0,
  regularMarketPrice: 4.94,
  exchange: "SET",
  shortName: "SICT_SILICON CRAFT TECHNOLOGY",
  longName: "Silicon Craft Technology Public Company Limited",
  messageBoardId: "finmb_613332570",
  exchangeTimezoneName: "Asia/Bangkok",
  exchangeTimezoneShortName: "ICT",
  gmtOffSetMilliseconds: 25200000,
  market: "th_market",
  esgPopulated: false,
  hasPrePostMarketData: false,
  firstTradeDateMilliseconds: new Date("2020-07-30T03:00:00.000Z"),
  priceHint: 4,
  regularMarketChange: 0,
  regularMarketTime: new Date("2024-04-09T09:35:36.000Z"),
  regularMarketDayHigh: 5,

  regularMarketDayRange: {
    low: 4.9,
    high: 5,
  },
  regularMarketDayLow: 4.9,
  regularMarketVolume: 249243,
  regularMarketPreviousClose: 4.94,
  bid: 4.94,
  ask: 4.98,
  fullExchangeName: "Thailand",
  financialCurrency: "THB",
  regularMarketOpen: 4.94,
  averageDailyVolume3Month: 698826,
  averageDailyVolume10Day: 419180,
  fiftyTwoWeekLowChange: 0.24000025,
  fiftyTwoWeekLowChangePercent: 0.051063884,
  fiftyTwoWeekRange: {
    low: 4.7,
    high: 10.9,
  },
  fiftyTwoWeekHighChange: -5.9599996,
  fiftyTwoWeekHighChangePercent: -0.546789,
  fiftyTwoWeekLow: 4.7,
  fiftyTwoWeekHigh: 10.9,
  fiftyTwoWeekChangePercent: -41.882355,
  trailingAnnualDividendRate: 0.035,
  trailingPE: 17.034483,
  dividendRate: 0.04,
  trailingAnnualDividendYield: 0.00708502,
  dividendYield: 0.66,
  epsTrailingTwelveMonths: 0.29,
  sharesOutstanding: 480000000,
  bookValue: 1.364,
  fiftyDayAverage: 5.3608,
  fiftyDayAverageChange: -0.42079973,
  fiftyDayAverageChangePercent: -0.0784957,
  twoHundredDayAverage: 7.0177,
  twoHundredDayAverageChange: -2.0777001,
  twoHundredDayAverageChangePercent: -0.2960657,
  marketCap: 2371200000,
  priceToBook: 3.621701,
  sourceInterval: 15,
  exchangeDataDelayedBy: 15,
  averageAnalystRating: "3.0 - Hold",
  tradeable: false,
  cryptoTradeable: false,
  symbol: "SICT.BK",
};
