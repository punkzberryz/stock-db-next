import { PublicNavbar } from "@/components/Navbar/navbar";
import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}
