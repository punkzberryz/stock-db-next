import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const cookie = cookies().get("stockdb-session")?.value;
  console.log(`[GET read-cookie] cookie: ${cookie}`);
  return NextResponse.json({ cookie });
};
