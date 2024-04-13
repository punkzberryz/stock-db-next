// import { authMiddleware } from "@clerk/nextjs";

import { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // return await updateSession(req);
}
// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
