"use client";

import { Button } from "@/components/ui/button";
import { useTransactionModalStore } from "./use-transaction-modal-store";
import { TransactionModal } from "./transaction-modal";
import { DeleteTransactionModal } from "./delete-transaction-modal";

const Client = () => {
  const { isOpen, setIsOpen } = useTransactionModalStore();
  const onAddTransactionClick = () => {
    useTransactionModalStore.setState({ transaction: null, addOrEdit: "add" });
    setIsOpen(true);
  };
  return (
    <div>
      <Button onClick={onAddTransactionClick}>Add transaction</Button>
      <TransactionModal isOpen={isOpen} setOpen={setIsOpen} />
      <DeleteTransactionModal />
    </div>
  );
};

export default Client;
