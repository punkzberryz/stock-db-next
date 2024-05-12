import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

enum PrivatePath {
  portfolio = "/portfolio",
  fundamental = "/fundamental",
  analysis = "/analysis",
  transaction = "/transaction",
}

enum AuthPath {
  signin = "/auth/signin",
  signup = "/auth/signup",
}

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const path = req.nextUrl.pathname;
  console.log(`[middleware] path: ${path}`);
  if (
    !path.startsWith("/cook") &&
    !path.startsWith(AuthPath.signin) &&
    !path.startsWith(AuthPath.signup) &&
    !path.startsWith(PrivatePath.portfolio) &&
    !path.startsWith(PrivatePath.fundamental) &&
    !path.startsWith(PrivatePath.transaction) &&
    !path.startsWith(PrivatePath.analysis)
  ) {
    // Skip public routes
    return NextResponse.next();
  }
  const { isValid } = await validateRequestMiddleware(req.nextUrl.origin);

  if (!isValid) {
    if (path.startsWith(AuthPath.signin)) {
      /*
      User is not signed in, allow access to /auth/signin and /auth/signup
      But redirect to /auth/signin if the user attempts to access other routes
      that is not /auth/signin or /auth/signup
      */
      return NextResponse.next();
    }

    const url = req.nextUrl.origin + AuthPath.signin;
    console.log(`[middleware] redirect to: ${url}`);
    return NextResponse.redirect(url);
  }
  // if path is /auth/signin, /auth/signup, we should redirect to the root if the user is already signed in
  if (path.startsWith(AuthPath.signin)) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/fundamental/:path*",
    "/analysis/:path*",
    "/portfolio/:path*",
    "/transaction/:path*",
    "/auth/signup",
    "/auth/signin",
    "/cook",
  ],
};

const validateRequestMiddleware = async (
  baseUrl: string
): Promise<{
  isValid: boolean;
  sessionId?: string;
}> => {
  const sessionId = cookies().get(COOKIE_NAME)?.value;

  if (!sessionId) {
    return {
      isValid: false,
    };
  }
  try {
    const resp = await fetch(`${baseUrl}/api/auth/validate-session`, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    });
    if (!resp.ok) {
      return {
        isValid: false,
      };
    }
    const data = (await resp.json()) as {
      valid?: boolean;
    };
    if (data.valid !== true) {
      return {
        isValid: false,
      };
    }
    return {
      isValid: true,
      sessionId,
    };
  } catch (err) {
    return {
      isValid: false,
    };
  }
};

export const COOKIE_NAME = "stockdb-session";
