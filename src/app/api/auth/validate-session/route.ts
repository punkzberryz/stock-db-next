import { NextRequest, NextResponse } from "next/server";
import { catchRouteErrorHelper } from "../../lib/helper";
import { validateRequest } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  const bearer = req.headers.get("Authorization");
  if (!bearer) {
    return NextResponse.json({});
  }
  const sessionId = bearer.split("Bearer ")[1] as string | undefined;
  if (!sessionId) {
    return NextResponse.json({});
  }
  try {
    const { session, user } = await validateRequest(sessionId);
    if (!session || !user) {
      return NextResponse.json({});
    }
    return NextResponse.json({ valid: true });
  } catch (err) {
    return catchRouteErrorHelper(err, "GET api/auth/validate-session");
  }
};
