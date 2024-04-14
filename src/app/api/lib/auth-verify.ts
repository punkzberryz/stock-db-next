import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "@/lib/prismadb";
import { Session } from "@prisma/client";
import { apiErrorResponse } from "./error.response";

export const verifyAuthInApiRoute = async (
  req: NextRequest
): Promise<{ session: Session | null; response?: NextResponse }> => {
  const bearer = req.headers.get("Authorization");
  if (!bearer) {
    return {
      session: null,
      response: apiErrorResponse({
        message: verifyAuthInApiRouteError.headerNotFound,
        statusCode: 401,
        statusText: "Unauthorized",
      }),
    };
  }
  const token = bearer.split("Bearer ")[1] as string | undefined;
  if (!token) {
    return {
      response: apiErrorResponse({
        message: verifyAuthInApiRouteError.tokenNotFound,
        statusCode: 401,
        statusText: "Unauthorized",
      }),
      session: null,
    };
  }
  // Verify the token
  try {
    const session = await prismadb.session.findUnique({
      where: {
        id: token,
      },
    });
    if (!session) {
      return {
        response: apiErrorResponse({
          message: verifyAuthInApiRouteError.sessionNotFound,
          statusCode: 401,
          statusText: "Unauthorized",
        }),
        session: null,
      };
    }
    return { session };
  } catch (err) {
    return {
      response: apiErrorResponse({
        message: verifyAuthInApiRouteError.serverError,
        statusCode: 500,
        statusText: "Internal Server Error",
      }),
      session: null,
    };
  }
};
export enum verifyAuthInApiRouteError {
  headerNotFound = "authorization header not found",
  tokenNotFound = "token not found",
  sessionNotFound = "session not found",
  serverError = "server error",
}
