import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPasswordAction,
} from "@/action/auth/auth-action";
import { NextRequest, NextResponse } from "next/server";
import { catchRouteErrorHelper } from "../../lib/helper";

export const POST = async (req: NextRequest) => {
  try {
    const {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = await req.json();
    const { session, user, error } = await signInWithEmailAndPassword({
      email,
      password,
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
