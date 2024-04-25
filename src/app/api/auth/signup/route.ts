import { signUpWithEmailAndPasswordAction } from "@/action/auth/auth-action";
import { NextRequest, NextResponse } from "next/server";
import { catchRouteErrorHelper } from "../../lib/helper";

export const POST = async (req: NextRequest) => {
  try {
    const {
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    } = await req.json();
    const { error, session, user } = await signUpWithEmailAndPasswordAction({
      email,
      password,
      displayName,
    });
    return NextResponse.json({
      error,
      session,
      user,
    });
  } catch (err) {
    return catchRouteErrorHelper(err, "POST /api/auth/signup");
  }
};
