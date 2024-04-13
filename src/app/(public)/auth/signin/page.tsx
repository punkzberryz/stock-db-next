import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import SignInForm from "./components/signin-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const SignInPage = () => {
  return (
    <MaxWidthWrapper className="flex flex-col items-center gap-10">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300">
        เข้าสู่ระบบ
      </h2>
      <SignInForm />
      <Link
        href="/auth/signup"
        className={buttonVariants({
          variant: "link",
        })}
      >
        สมัครสมาชิก
      </Link>
    </MaxWidthWrapper>
  );
};

export default SignInPage;
