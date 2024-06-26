import { NextResponse } from "next/server";

export const apiErrorResponse = ({
  message,
  statusCode,
  statusText,
}: {
  message: string;
  statusCode: number;
  statusText?: string;
}) => {
  return NextResponse.json(
    {
      error: { message },
    },
    { status: statusCode, statusText: statusText ?? "ServerError" }
  );
};
