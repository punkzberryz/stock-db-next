import { config } from "@/lib/config";
import { catchErrorHelper, responseErrorHelper } from "@/lib/error";
import { Info } from "@/schema/stock/info.schema";

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
