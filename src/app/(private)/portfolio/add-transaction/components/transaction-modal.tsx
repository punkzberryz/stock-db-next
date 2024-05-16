"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTransactionModalStore } from "./use-transaction-modal-store";
import TransactionForm from "./form/transaction-form";
interface TransactionModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}
const TransactionModal = ({ isOpen, setOpen }: TransactionModalProps) => {
  const { addOrEdit } = useTransactionModalStore();
  const title = addOrEdit === "add" ? "Add Transaction" : "Edit Transaction";
  const description =
    addOrEdit === "add" ? "Add a new transaction" : "Edit the transaction";
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <ScrollArea className="max-h-[500px]">
          <div className="px-2">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <TransactionForm setOpenMoal={setOpen} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export { TransactionModal };
