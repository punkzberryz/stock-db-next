import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import SignInForm from "./components/signin-form";

const SignInPage = () => {
  return (
    <MaxWidthWrapper>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300">
        เข้าสู่ระบบ
      </h2>
      <SignInForm />
    </MaxWidthWrapper>
  );
};

export default SignInPage;
