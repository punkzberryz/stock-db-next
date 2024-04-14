"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDateString } from "@/lib/format";
import { Fundamental } from "@/schema/stock/fundamental.schema";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CSVLink } from "react-csv";
interface ClientProps {}
const Client = ({}: ClientProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleGetFundamental = () => {
    if (!inputRef.current?.value) return;
    if (inputRef.current?.value.trim() === "") return;
    router.push(`/fundamental/reits?ticker=${inputRef.current?.value}`);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Label>Stock Ticker</Label>
        <Input ref={inputRef} placeholder="SICT.BK" />
        <Button onClick={handleGetFundamental}>Get Fundamental</Button>
      </div>
    </div>
  );
};

export default Client;
