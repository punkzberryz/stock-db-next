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
        <div className="mx-auto">
          <Link href="/fundamental">Fundamental</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
