import { config } from "@/lib/config";
import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import { Fundamental } from "@/schema/stock/fundamental.schema";
import { Info } from "@/schema/stock/info.schema";

export const getFundamental = async ({
  ticker,
  type,
}: {
  ticker: string;
  type?: "quarterly" | "annual";
}) => {
  try {
    const resp = await fetch(
      `${config.baseUrl}/api/stock/${ticker}/fundamental?type=${
        type ?? "annual"
      }`
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

export const getInfo = async ({ ticker }: { ticker: string }) => {
  try {
    const resp = await fetch(`${config.baseUrl}/api/stock/${ticker}/info`);
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
