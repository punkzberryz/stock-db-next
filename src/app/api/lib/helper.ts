import { NextResponse } from "next/server";

export const catchRouteErrorHelper = (err: unknown, route: string) => {
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
