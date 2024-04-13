import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2">
          <div className="w-[100px] h-auto -m-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </div>
          <p className="text-4xl font-semibold tracking-wider">Stonk-db</p>
        </div>
        <div className="mx-auto flex gap-4">
          <Link href="/fundamental">Fundamental</Link>
          <Link href="/auth/signin">Sign in</Link>
          <Link href="/auth/signup">Sign up</Link>
          <Link href="/me">Me</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
