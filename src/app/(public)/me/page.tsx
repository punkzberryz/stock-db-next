import MaxWidthWrapper from "@/components/max-width-wrapper";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./signout-button";

const MePage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/signin");
  }
  return (
    <MaxWidthWrapper>
      <h1>My page</h1>
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <SignOutButton />
    </MaxWidthWrapper>
  );
};

export default MePage;
