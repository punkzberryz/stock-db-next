"use client";

import { formatCurrency } from "@/lib/format";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatDate } from "date-fns";
import toast from "react-hot-toast";
import { Currency } from "@/lib/get-currency";
import { CompanyProfile } from "@prisma/client";

interface CompanyProfileDisplayProps {
  profile: CompanyProfile;
  currency: Currency;
}

const writeTextWithLabel = (label: string, text: string) => {
  return `${label}\t${text}`;
};

const CompanyProfileDisplay = ({
  profile,
  currency,
}: CompanyProfileDisplayProps) => {
  const textToCopy = [
    writeTextWithLabel("Name", profile.companyName),
    writeTextWithLabel("Symbol", profile.symbol),
    writeTextWithLabel(
      "Price",
      `${formatCurrency(profile.price, {
        currency: currency,
      })} (${formatDate(new Date(), "yyyy-MM-dd")})`
    ),
    writeTextWithLabel(
      "Market Cap",
      formatCurrency(profile.mktCap, { currency })
    ),
    writeTextWithLabel("Industry", profile.industry),
    writeTextWithLabel("Sector", profile.sector),
    writeTextWithLabel("Website", profile.website),
    writeTextWithLabel("CEO", profile.ceo),
    writeTextWithLabel(
      "YahooFinance",
      `https://finance.yahoo.com/quote/${profile.symbol}`
    ),
  ].join("\n");
  const onClickToCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="relative flex flex-col gap-2 border p-6 rounded-xl group hover:bg-gray-50">
      <div className="opacity-0 absolute ml-auto right-5 bottom-5 group-hover:opacity-100 duration-300">
        <Button onClick={onClickToCopy}>Coppy</Button>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Name</p>
        <p>
          {profile.companyName}
          <span className="px-2 text-gray-500">({profile.symbol})</span>
        </p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Price</p>
        <p>{formatCurrency(profile.price, { currency })}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">DCF</p>
        <p>{profile.dcf ? formatCurrency(profile.dcf, { currency }) : "-"}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Market Cap</p>
        <p>{formatCurrency(profile.mktCap, { currency })}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Website</p>
        <Link
          href={profile.website}
          className="hover:underline hover:text-primary"
        >
          {profile.website}
        </Link>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Industry</p>
        <p>{profile.industry}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Sector</p>
        <p>{profile.sector}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">CEO</p>
        <p>{profile.ceo}</p>
      </div>
      <div>
        <Link
          className="hover:underline hover:text-primary text-purple-700"
          href={`https://finance.yahoo.com/quote/${profile.symbol}`}
        >
          Link to YahooFinance
        </Link>
      </div>
    </div>
  );
};

export default CompanyProfileDisplay;
