import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";

export type ReitsAnalysisResponse = Awaited<
  ReturnType<typeof fmpApi.getReitsAnalysis>
>;
