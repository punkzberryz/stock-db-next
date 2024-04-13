import MaxWidthWrapper from "@/components/max-width-wrapper";
import { validateRequest } from "@/lib/auth";
import SignOutButton from "./signout-button";

const MePage = async () => {
  let user: Awaited<ReturnType<typeof validateRequest>>["user"] = null;
  try {
    const resp = await validateRequest();
    if (!resp.user) {
      // return redirect("/auth/signin");
      return null;
    }
    user = resp.user;
  } catch (e) {
    console.error(e);
    return null;
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
