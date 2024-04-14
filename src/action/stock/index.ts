import { config } from "@/lib/config";
import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import {
  Fundamental,
  ReitsFundamental,
} from "@/schema/stock/fundamental.schema";
import { Info } from "@/schema/stock/info.schema";
import { YahooChartResponse } from "@/schema/stock/chart.schema";
import { format } from "date-fns";
import { formatDateString } from "@/lib/format";

export const getReitsFundamental = async ({
  ticker,
  periodType,
  sessionId,
}: {
  ticker: string;
  periodType?: "quarterly" | "annual";
  sessionId: string;
}) => {
  try {
    const resp = await fetch(
      `${config.baseUrl}/api/stock/${ticker}/fundamental?` +
        new URLSearchParams({
          periodType: periodType ?? "annual",
          type: "reits",
        }),
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      }
    );

    if (!resp.ok) {
      const data = await resp.json();
      return responseErrorHelper(resp.status, data.error?.message);
    }
    const data = (await resp.json()) as ReitsFundamental[];

    return data;
  } catch (err) {
    return catchErrorHelper("getReitsFundamental", err);
  }
};

export const getFundamental = async ({
  ticker,
  periodType,
  sessionId,
}: {
  ticker: string;
  periodType?: "quarterly" | "annual";
  sessionId: string;
}) => {
  try {
    const resp = await fetch(
      `${config.baseUrl}/api/stock/${ticker}/fundamental?periodType=${
        periodType ?? "annual"
      }`,
      {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      }
    );

    if (!resp.ok) {
      const data = await resp.json();
      return responseErrorHelper(resp.status, data.error?.message);
    }
    const data = (await resp.json()) as Fundamental[];

    return data;
  } catch (err) {
    return catchErrorHelper("getFundamental", err);
  }
};

export const getInfo = async ({
  ticker,
  sessionId,
}: {
  ticker: string;
  sessionId: string;
}) => {
  try {
    const resp = await fetch(`${config.baseUrl}/api/stock/${ticker}/info`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    });
    if (!resp.ok) {
      const data = await resp.json();
      return responseErrorHelper(resp.status, data.error?.message);
    }
    const data = (await resp.json()) as Info;
    return data;
  } catch (err) {
    return catchErrorHelper("getInfo", err);
  }
};

export const getPrice = async ({
  ticker,
  sessionId,
}: {
  ticker: string;
  sessionId: string;
}) => {
  try {
    const resp = await fetch(`${config.baseUrl}/api/stock/${ticker}/price`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    });
    if (!resp.ok) {
      const data = await resp.json();
      return responseErrorHelper(resp.status, data.error?.message);
    }
    const data = (await resp.json()) as YahooChartResponse;
    const quotes: Map<string, { date: Date; close: number }> = new Map();
    data.quotes.forEach((q) => {
      const date = new Date(q.date);
      const dateString = formatDateString(date, { excludeDay: true });
      quotes.set(dateString, {
        close: q.close,
        date,
      });
    });

    const dividends: Map<
      string,
      {
        date: Date;
        amount: number;
      }
    > = new Map();
    data.events.dividends.forEach((d) => {
      const date = new Date(d.date);
      const dateString = formatDateString(date, { excludeDay: true });
      dividends.set(dateString, {
        amount: d.amount,
        date,
      });
    });
    return {
      quotes,
      dividends,
    };
  } catch (err) {
    return catchErrorHelper("getPrice", err);
  }
};
