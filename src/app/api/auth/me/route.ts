import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";
import { catchRouteErrorHelper } from "../../lib/helper";

export const GET = async (req: NextRequest) => {
  try {
    const { session, user } = await validateRequest();
    if (!session || !user) {
      throw new UnauthorizedError("invalid session");
    }
    return NextResponse.json({ user });
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/auth/me");
  }
};
