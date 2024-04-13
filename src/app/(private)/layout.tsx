import { PrivateNavbar } from "@/components/Navbar/navbar";
import React from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateNavbar />
      {children}
    </>
  );
}
