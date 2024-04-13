"use client";

import { Button } from "@/components/ui/button";

const Client = () => {
  const handleClick = async () => {
    const res = await fetch("/api/auth/read-cookie");
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <Button onClick={handleClick}>get cookie from check-cookie</Button>
    </div>
  );
};

export default Client;
