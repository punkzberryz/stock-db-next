"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ClientProps {}
const Client = ({}: ClientProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleGetReitsAnalysis = () => {
    if (!inputRef.current?.value) return;
    if (inputRef.current?.value.trim() === "") return;
    router.push(`/analysis/reits?ticker=${inputRef.current?.value}`);
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
        <Button onClick={handleGetReitsAnalysis}>Analyze Reits</Button>
      </div>
    </div>
  );
};

export default Client;
