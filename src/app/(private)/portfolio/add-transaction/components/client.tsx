"use client";

import { Button } from "@/components/ui/button";
import { AddTransactionModal } from "./add-transaction-modal";
import { useState } from "react";

const Client = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <AddTransactionModal isOpen={isOpen} setOpen={setIsOpen} />
      <Button onClick={() => setIsOpen(true)}>Add transaction</Button>
    </div>
  );
};

export default Client;
