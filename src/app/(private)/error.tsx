"use client";

import { PrivateNavbar } from "@/components/Navbar/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <main className="px-10 h-screen">
      <div className="pt-10 flex flex-col justify-center items-center md:grid md:grid-rows-3 md:grid-flow-col">
        <header className="lg:col-span-2 md:order-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
            อุ๊ปปปซ์..
          </h1>
          <h2 className="text-base md:text-lg">มีข้อผิดพลาดเกิดขึ้น</h2>
        </header>
        <div className="relative w-[200px] h-[200px] md:row-span-3 md:order-1 m-10">
          {/* <Image
            className="rounded-3xl"
            alt="sad panda"
            src="/img/error/sadPanda.jpg"
            sizes="200px"
            priority
            fill
          /> */}
        </div>
        <div className="md:col-span-2 md:order-3 max-w-[350px]">
          <p className="text-base md:text-lg font-light pb-5">
            <span>เกิดข้อผิดพลาดเนื่องจาก</span>
            <span>{error.message}</span>
          </p>
          <div className="grid grid-cols-1 gap-y-4">
            <Button className="w-full" onClick={reload}>
              กดปุ่มเพื่อลองอีกครั้ง
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
