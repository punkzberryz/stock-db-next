import { GetProfileResponse } from "@/app/api/stock/fmp/[ticker]/company-info/response";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";

interface CompanyProfileDisplayProps {
  profile: GetProfileResponse;
}
const CompanyProfileDisplay = ({ profile }: CompanyProfileDisplayProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex space-x-2">
        <p className="text-gray-500">Name</p>
        <p>
          {profile.companyName}
          <span className="px-2 text-gray-500">({profile.symbol})</span>
        </p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Price</p>
        <p>{formatCurrency(profile.price)}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">DCF</p>
        <p>{formatCurrency(profile.dcf)}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Market Cap</p>
        <p>{formatCurrency(profile.mktCap)}</p>
      </div>
      <div className="flex space-x-2">
        <p className="text-gray-500">Industry</p>
        <p>{profile.industry}</p>
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
    </div>
  );
};

export default CompanyProfileDisplay;
