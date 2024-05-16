import { Transaction } from "@prisma/client";
import { create } from "zustand";

/*
    Store modal is for managing the state of the modal

    we use this in data-table where there are many triggers for the modal
    however we don't want to create a new modal for each trigger hence 
    we share the same modal state but we update the onConfirm function
    and the content inside the modal

*/

interface useTransactionModalStore {
  addOrEdit: "add" | "edit";
  transaction: Transaction | null;
  transactionIsLoading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useTransactionModalStore = create<useTransactionModalStore>(
  (set) => ({
    addOrEdit: "add",
    transaction: null,
    transactionIsLoading: false,
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  })
);
