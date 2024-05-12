"use client";
import { useAuthStore } from "@/hooks/stores/auth/useAuthStore";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWithoutPassword } from "@/hooks/stores/auth/userSlice";
import { signOut } from "@/action/auth/auth-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
const AuthNav = () => {
  const { fetchUser, user } = useAuthStore();
  useEffect(() => {
    console.log("fetching user useEffect");
    fetchUser();
  }, [fetchUser]);
  return <div>{user ? <AuthNavDropdown user={user} /> : null}</div>;
};

const AuthNavDropdown = ({ user }: { user: UserWithoutPassword }) => {
  const router = useRouter();
  const { clearUser } = useAuthStore();
  const handleSignOut = async () => {
    console.log("sign out");
    try {
      await signOut();
      clearUser();
      router.push("/auth/signin");
      router.refresh();
      toast.success("Sign out successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{user.displayName}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/me">Me</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNav;
