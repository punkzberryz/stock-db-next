"use server";
import { prismadb } from "@/lib/prismadb";
import { Argon2id } from "oslo/password";
import { clearSession, createSession, validateRequest } from "@/lib/auth";
import { BadRequestError, catchErrorForServerActionHelper } from "@/lib/error";
import { generateId } from "lucia";
import { SignInErrorResponse, SignUpErrorResponse } from "./error-response";
import { SignInSchema } from "@/app/(public)/auth/signin/components/signin-schema";

export const signUpWithEmailAndPasswordAction = async ({
  displayName,
  email,
  password,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);
  try {
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new BadRequestError(SignUpErrorResponse.emailAlreadyExists);
    }
    const user = await prismadb.user.create({
      data: {
        displayName,
        email,
        hashedPassword: hashedPassword,
        id: userId,
      },
    });

    const session = await createSession(user.id);
    return { user, session, error: null };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      user: null,
      session: null,
      error,
    };
  }
};

export const signInWithEmailAndPassword = async ({
  email,
  password,
}: SignInSchema) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    const validPassword = await new Argon2id().verify(
      user?.hashedPassword ?? "nil",
      password
    );
    if (!user || !validPassword) {
      throw new BadRequestError(SignInErrorResponse.passwordOrEmailIsNotMatch);
    }
    const session = await createSession(user.id);
    return { user, session };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    if (error.message === "password hash string missing field") {
      return {
        user: null,
        session: null,
        error: {
          message: String(SignInErrorResponse.passwordOrEmailIsNotMatch),
          code: 400,
        },
      };
    }

    return {
      user: null,
      session: null,
      error,
    };
  }
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();
    if (!session) {
      return {
        error: { message: "Session not found", code: 401 },
      };
    }
    await clearSession(session.id);
    return {
      error: null,
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return {
      error,
    };
  }
};
