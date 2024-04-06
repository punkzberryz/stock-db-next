import type { Metadata } from "next";
import { Kanit as FontSans } from "next/font/google";

import "@/components/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ThemeToggleButton from "@/components/theme/theme-toggle-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/Navbar/navbar";

const fontSans = FontSans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  subsets: ["latin", "thai"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <ThemeToggleButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
