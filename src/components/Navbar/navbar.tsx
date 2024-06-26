import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AuthNav from "./auth-nav";
import MiddleNav from "./middle-nav";
import ThemeToggleButton from "../theme/theme-toggle-button";

const NavbarContent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav>
      <div className="flex gap-2 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 w-[250px]">
            <div className="w-[50px] h-auto m-2 rounded-xl p-2 bg-primary">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <p className="hidden lg:block text-2xl font-semibold tracking-wider">
              Stonk-db
            </p>
          </div>
        </Link>
        {children}
      </div>
    </nav>
  );
};

const PublicNavbar = () => {
  return (
    <NavbarContent>
      <div className="ml-auto mr-10 flex gap-4">
        <Link
          className={buttonVariants({
            variant: "ghost",
          })}
          href="/auth/signin"
        >
          Sign in
        </Link>
      </div>
    </NavbarContent>
  );
};

const PrivateNavbar = () => {
  return (
    <NavbarContent>
      <div className="flex gap-4">
        <MiddleNav />
      </div>
      <div className="w-[250px] flex justify-end">
        <div className="mr-10 flex space-x-2 items-center">
          <ThemeToggleButton />
          <AuthNav />
        </div>
      </div>
    </NavbarContent>
  );
};

export { PublicNavbar, PrivateNavbar };
