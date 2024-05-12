import MaxWidthWrapper from "@/components/max-width-wrapper";
import { metadataHelper } from "@/lib/metadata";
import Client from "./components/client";
import { getSessionId, validateRequest } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import DataTable from "@/components/Table/data-table";
import { makeTransactionTableData } from "./components/table/format-data";
import { transactionColumns } from "./components/table/column-def";

const TransactionPage = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return;
  }
  //get all transactions
  const transactions = await prismadb.transaction.findMany({
    where: {
      userId: session.userId,
    },
  });

  const formattedTransactions = makeTransactionTableData(transactions);

  return (
    <MaxWidthWrapper className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tighter">Transaction</h1>
        <h2 className="text-lg text-gray-500">Add transaction</h2>
      </div>
      <DataTable data={formattedTransactions} columns={transactionColumns} />
      <Client />
    </MaxWidthWrapper>
  );
};

export default TransactionPage;
export const metadata = metadataHelper({
  title: "Transaction",
  description: "Transaction",
});
