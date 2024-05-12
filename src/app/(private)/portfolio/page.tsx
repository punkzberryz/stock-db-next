import MaxWidthWrapper from "@/components/max-width-wrapper";
import Client from "./components/client";
import { metadataHelper } from "@/lib/metadata";

const PortfolioPage = async () => {
  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          My Portfolio
        </h1>
        <h2 className="text-lg text-gray-500">My portfolio page</h2>
      </div>
      <Client />
    </MaxWidthWrapper>
  );
};

export default PortfolioPage;
export const metadata = metadataHelper({
  title: "Portfolio",
  description: "Portfolio",
});
