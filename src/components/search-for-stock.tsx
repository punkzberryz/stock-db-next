"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const SearchForStockInput = ({ url }: { url: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleOnClick = () => {
    if (!inputRef.current?.value) return;
    if (inputRef.current?.value.trim() === "") return;
    router.push(url + "?ticker=" + inputRef.current?.value);
  };
  return (
    <div className="relative flex gap-4 items-center">
      <Label
        htmlFor="stock-search"
        className="absolute left-2.5 top-2.5 h-5 border rounded-xl px-2.5 py-0.5"
      >
        Stock ticker
      </Label>
      <Input
        ref={inputRef}
        id="stock-search"
        placeholder="Search..."
        className="pl-28"
        type="search"
      />
      <Button type="button" onClick={handleOnClick}>
        Search
      </Button>
    </div>
  );
};

export default SearchForStockInput;
