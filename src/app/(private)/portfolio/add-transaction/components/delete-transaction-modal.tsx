"use client";

import { LoadingIcon } from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/stores/use-modal-store";
import { useState } from "react";

interface DeleteTransactionModalProps {}
const DeleteTransactionModal = ({}: DeleteTransactionModalProps) => {
  const { isOpen, setIsOpen, onConfirm: onDeleteConfirm } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const onConfirm = () => {
    setIsLoading(true);
    onDeleteConfirm().finally(() => setIsLoading(false));
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="px-2">
          <DialogHeader>
            <DialogTitle>Deleteing Transaction</DialogTitle>
            <DialogDescription>
              Deleting this transaction will be permanent, are you sure?
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-24"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={onConfirm}
            className="w-24"
          >
            {isLoading ? <LoadingIcon /> : <span>Continue</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export { DeleteTransactionModal };
