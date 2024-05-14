import MaxWidthWrapper from "@/components/max-width-wrapper";
import Client from "./components/client";
import { metadataHelper } from "@/lib/metadata";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { prismadb } from "@/lib/prismadb";
import {
  makeFinalPortfolioData,
  makeInitialPortfolioData,
  PortfolioRow,
} from "./components/table/format-data";
import DataTable from "@/components/Table/data-table";
import { portfolioColumns } from "./components/table/column-def";
import { fetchQuote } from "@/action/stock/quote-repo";

const PortfolioPage = async () => {
  const { session } = await validateRequest();
  if (!session) {
    throw new UnauthorizedError();
  }
  //get all transactions
  const transactions = await prismadb.transaction.findMany({
    where: {
      userId: session.userId,
    },
  });

  const initPortfolioData: PortfolioRow[] = [];
  const promises: ReturnType<typeof fetchQuote>[] = [];

  makeInitialPortfolioData(transactions).forEach((value) => {
    initPortfolioData.push(value);
    promises.push(fetchQuote(value.ticker));
  });

  //Get the latest price
  const qoutes = await Promise.all(promises);
  const prices = qoutes.map((qoute) => qoute.data?.price);
  const portfolioData = makeFinalPortfolioData(initPortfolioData, prices);

  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">
          My Portfolio
        </h1>
        <h2 className="text-lg text-gray-500">My portfolio page</h2>
      </div>
      <DataTable data={portfolioData} columns={portfolioColumns} />
      <Client />
    </MaxWidthWrapper>
  );
};

export default PortfolioPage;
export const metadata = metadataHelper({
  title: "Portfolio",
  description: "Portfolio",
});
