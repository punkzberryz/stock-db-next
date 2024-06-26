import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import SignUpForm from "./components/signup-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const SignUpPage = async () => {
  return (
    <MaxWidthWrapper className="flex flex-col items-center gap-10">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300">
        สมัครสมาชิกใหม่
      </h2>
      <p>Not implemented</p>
      <SignUpForm />
      <Link
        href="/auth/signin"
        className={buttonVariants({
          variant: "link",
        })}
      >
        เข้าสู่ระบบ
      </Link>
    </MaxWidthWrapper>
  );
};

export default SignUpPage;
