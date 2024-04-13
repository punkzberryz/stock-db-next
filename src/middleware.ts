// import { authMiddleware } from "@clerk/nextjs";

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const validateRequestMiddleware = async (baseUrl: string) => {
  const sessionId = cookies().get(COOKIE_NAME)?.value;
  if (!sessionId) {
    return false;
  }
  try {
    const resp = await fetch(`${baseUrl}/api/auth/validate-session`, {
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

  if (
    !path.startsWith("/fundamental") &&
    !path.startsWith("/cook") &&
    !path.startsWith("/auth/signin") &&
    !path.startsWith("/auth/signup")
  ) {
    // Skip public routes
    return NextResponse.next();
  }
  const isValid = await validateRequestMiddleware(req.nextUrl.origin);

  if (!isValid) {
    const url = req.nextUrl.origin + "/auth/signin";
    console.log(`[middleware] redirect to: ${url}`);
    return NextResponse.redirect(url);
  }
  // if path is /auth/signin, /auth/signup, we should redirect to the root if the user is already signed in
  if (path.startsWith("/auth/sign")) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/fundamental/:path*", "/auth/signin", "/auth/signup", "/cook"],
};

// const baseURL = process.env.BASE_URL || "http://localhost:3000";
