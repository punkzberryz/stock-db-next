import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "@/lib/error";
import { NextResponse } from "next/server";

export const catchRouteErrorHelper = (err: unknown, route: string) => {
  if (err instanceof UnauthorizedError) {
    console.error(`[UNAUTH_ERROR ${route}] ${err.message}`);
    return NextResponse.json(
      {
        error: { message: err.message },
      },
      { status: 401, statusText: "Unauthorized" }
    );
  }
  if (err instanceof BadRequestError) {
    console.error(`[BAD_REQUEST_ERROR ${route}] ${err.message}`);
    return NextResponse.json(
      {
        error: { message: err.message },
      },
      { status: 400, statusText: "BadRequest" }
    );
  }
  if (err instanceof InternalServerError) {
    console.error(`[INTERNAL_SERVER_ERROR ${route}] ${err.message}`);
    return NextResponse.json(
      {
        error: { message: err.message },
      },
      { status: 500, statusText: "InternalServerError" }
    );
  }
  if (err instanceof Error) {
    console.error(`[ERROR ${route}] ${err.message}`);
    return NextResponse.json(
      {
        error: { message: err.message },
      },
      { status: 500, statusText: "ServerError" }
    );
  }
  if (typeof err === "string") {
    console.error(`[ERROR ${route}] ${err}`);
    return NextResponse.json(
      {
        error: { message: err },
      },
      { status: 500, statusText: "ServerError" }
    );
  }
  console.error(`[ERROR ${route}] ${err}`);
  return NextResponse.json(
    {
      error: { message: `${err}` },
    },
    { status: 500, statusText: "ServerError" }
  );
};

export const divideByMillion = (num?: number) => {
  return num ? num / 1000000 : undefined;
};
