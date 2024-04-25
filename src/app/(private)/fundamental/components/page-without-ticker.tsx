import { fetchManyCompanyProfile } from "@/action/stock/profile-repo";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SearchForStockInput from "@/components/search-for-stock";
import { buttonVariants } from "@/components/ui/button";
import { InternalServerError } from "@/lib/error";
import Link from "next/link";

const PageWithoutTicker = async ({ url }: { url: string }) => {
  const { data, error } = await fetchManyCompanyProfile({
    limit: 10,
    pageId: 1,
  });
  if (error) {
    throw new InternalServerError("Error fetching data");
  }

  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          Stock Fundamental
        </h1>
        <h2 className="text-lg text-gray-500">Search for stock fundamental</h2>
      </div>
      <SearchForStockInput url={url} />
      {data ? (
        <div className="p-6 border rounded-xl shadow-lg flex flex-wrap gap-6">
          {data.map((p) => (
            <div key={p.symbol}>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={`/fundamental?ticker=${p.symbol}`}
              >
                {p.symbol}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </MaxWidthWrapper>
  );
};

export default PageWithoutTicker;
