import { create } from "zustand";

/*
    Store modal is for managing the state of the modal

    we use this in data-table where there are many triggers for the modal
    however we don't want to create a new modal for each trigger hence 
    we share the same modal state but we update the onConfirm function
    and the content inside the modal

*/

interface useModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
  setOnConfirm: (onConfirm: () => Promise<void>) => void;
}

export const useModalStore = create<useModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  onConfirm: async () => {},
  setOnConfirm: (onConfirm: () => Promise<void>) => set({ onConfirm }),
}));
