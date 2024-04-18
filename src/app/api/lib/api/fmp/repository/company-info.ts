import {
  BadRequestError,
  catchErrorHelper,
  responseErrorHelper,
} from "@/lib/error";
import { FMP_URL } from "../config";

export class FmpApiCompanyInfo {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async getProfile(symbol: string) {
    try {
      const resp = await fetch(
        `${FMP_URL}/profile/${symbol}?apikey=${this.apiKey}`
      );
      if (!resp.ok) {
        const data = await resp.json();
        return responseErrorHelper(resp.status, data["Error Message"]);
      }
      const data = (await resp.json()) as FmpCompanyProfile[];
      if (!data.length) {
        throw new BadRequestError("got empty profile");
      }
      return makeProfile(data[0]);
    } catch (err) {
      return catchErrorHelper("FmpApiFinancial", err);
    }
  }
}

const makeProfile = (companyProfile: FmpCompanyProfile): GetProfile => {
  return {
    symbol: companyProfile.symbol,
    price: companyProfile.price,
    mktCap: companyProfile.mktCap,
    companyName: companyProfile.companyName,
    currency: companyProfile.currency,
    exchangeShortName: companyProfile.exchangeShortName,
    industry: companyProfile.industry,
    website: companyProfile.website,
    description: companyProfile.description,
    ceo: companyProfile.ceo,
    sector: companyProfile.sector,
    country: companyProfile.country,
    dcfDiff: companyProfile.dcfDiff,
    dcf: companyProfile.dcf,
    image: companyProfile.image,
    ipoDate: companyProfile.ipoDate,
  };
};
type GetProfile = {
  symbol: string;
  price: number;
  mktCap: number;
  companyName: string;
  currency: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
};
type FmpCompanyProfile = {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: false;
  isEtf: false;
  isActivelyTrading: true;
  isAdr: false;
  isFund: false;
};
