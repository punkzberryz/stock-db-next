// import { authMiddleware } from "@clerk/nextjs";

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const validateRequestMiddleware = async () => {
  const sessionId = cookies().get(COOKIE_NAME)?.value;
  if (!sessionId) {
    return false;
  }
  try {
    const resp = await fetch(`${baseURL}/api/auth/validate-session`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    });
    if (!resp.ok) {
      return false;
    }
    const data = (await resp.json()) as {
      valid?: boolean;
    };
    if (data.valid !== true) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const COOKIE_NAME = "stockdb-session";
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/fundamental") || path.startsWith("/cook")) {
    // Skip public routes
    return NextResponse.next();
  }
  const isValid = await validateRequestMiddleware();

  if (!isValid) {
    const url = req.nextUrl.origin + "/auth/signin";
    console.log(`[middleware] redirect to: ${url}`);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/fundamental/:path*", "/auth/signin", "/auth/signup", "/cook"],
};

const baseURL = process.env.BASE_URL || "http://localhost:3000";
