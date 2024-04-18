import { fmpApi } from "@/app/api/lib/api/fmp/fmp-api";

export type GetProfileResponse = Awaited<ReturnType<typeof fmpApi.getProfile>>;
