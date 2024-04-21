import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";
import React from "react";
interface CopyTableToClipboardProps {
  data: Awaited<ReturnType<typeof fmpApi.getFinancialStatements>>;
}
const CopyTableToClipboard = ({ data }: CopyTableToClipboardProps) => {
  const CreateHtmlTable = (
    data: Awaited<ReturnType<typeof fmpApi.getFinancialStatements>>
  ) => {};
  return <div></div>;
};

export default CopyTableToClipboard;
