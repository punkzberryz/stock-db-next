"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddTransactionForm from "./form/add-transaction-form";
import { ScrollArea } from "@/components/ui/scroll-area";
interface AddTransactionModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}
const AddTransactionModal = ({ isOpen, setOpen }: AddTransactionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <ScrollArea className="max-h-[500px]">
          <div className="px-2">
            <DialogHeader>
              <DialogTitle>Add transaction</DialogTitle>
              <DialogDescription>
                Add buy or sell transaction of the stock
              </DialogDescription>
            </DialogHeader>
            <AddTransactionForm setOpenMoal={setOpen} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export { AddTransactionModal };
