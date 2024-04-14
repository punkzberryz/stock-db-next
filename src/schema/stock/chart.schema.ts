export type YahooChartResponse = {
  meta: {
    currency: string;
    symbol: string;
    exchangeName: string;
    fullExchangeName: string;
    instrumentType: string;
    firstTradeDate: Date;
    regularMarketTime: Date;
    hasPrePostMarketData: boolean;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    chartPreviousClose: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: currentTradingPeriodType;
      regular: currentTradingPeriodType;
      post: currentTradingPeriodType;
    };
    dataGranularity: string;
  };
  quotes: quoteType[];
  events: {
    dividends: dividendType[];
  };
};

type currentTradingPeriodType = {
  timezone: string;
  end: Date;
  start: Date;
  gmtoffset: number;
};
type quoteType = {
  date: string;
  high: number;
  volume: number;
  open: number;
  low: number;
  close: number;
  adjclose: number;
};
type dividendType = {
  date: string;
  amount: number;
};
