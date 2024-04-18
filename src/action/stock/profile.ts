import { GetProfileResponse } from "@/app/api/stock/fmp/[ticker]/company-info/response";
import { config } from "@/lib/config";
import { catchErrorHelper, responseErrorHelper } from "@/lib/error";

export const getCompanyProfile = async ({
  ticker,
  sessionId,
}: {
  ticker: string;
  sessionId: string;
}) => {
  try {
    const resp = await fetch(
      `${config.baseUrl}/api/stock/fmp/${ticker}/company-info`,
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
    const data = (await resp.json()) as GetProfileResponse;
    return data;
  } catch (err) {
    return catchErrorHelper("getCompanyProfile", err);
  }
};
