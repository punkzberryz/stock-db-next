"use client";

import { signOut } from "@/action/auth/auth-action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const router = useRouter();
  const handleOnSignOut = async () => {
    const error = await signOut();
    if (error) {
      toast.error("Sign out failed");
      return;
    }
    toast.success("Sign out success");
    router.push("/");
    router.refresh();
  };
  return <Button onClick={handleOnSignOut}>Sign out</Button>;
};

export default SignOutButton;
