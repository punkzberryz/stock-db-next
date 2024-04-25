import MaxWidthWrapper from "@/components/max-width-wrapper";
import DataTable from "@/components/Table/data-table";
import { BadRequestError } from "@/lib/error";
import { reitsRatingCompareColumns } from "./components/column-def";
import { getAllReitsRating } from "@/action/stock/reits";

const CompareReitsPage = async () => {
  //We compare reits rating saved in the database
  const results = await getAllReitsRating();
  if (results.error) {
    throw new BadRequestError(results.error.message);
  }

  return (
    <MaxWidthWrapper>
      <DataTable
        columns={reitsRatingCompareColumns}
        data={results.reitsRating}
        orientation="horizontal"
        options={{ cellHeight: "h-20" }}
      />
    </MaxWidthWrapper>
  );
};

export default CompareReitsPage;
