import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import SignUpForm from "./components/signup-form";

const SignUpPage = async () => {
  return (
    <MaxWidthWrapper>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-300">
        สมัครสมาชิกใหม่
      </h2>
      <SignUpForm />
    </MaxWidthWrapper>
  );
};

export default SignUpPage;
