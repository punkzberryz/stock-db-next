"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useTransactionModalStore } from "../use-transaction-modal-store";
import {
  deleteTransaction,
  getTransactionById,
} from "@/action/transaction/transaction-repo";
import toast from "react-hot-toast";
import { useModalStore } from "@/hooks/stores/use-modal-store";
import { useRouter } from "next/navigation";

const CellActionButtons = ({ transactionId }: { transactionId: number }) => {
  const router = useRouter();
  const { setIsOpen } = useTransactionModalStore();
  const { setOnConfirm: setOnDeleteConfirm, setIsOpen: setDeleteModalIsOpen } =
    useModalStore();
  const onEditActionClick = () => {
    useTransactionModalStore.setState({
      addOrEdit: "edit",
      transactionIsLoading: true,
    });
    setIsOpen(true);
    // fetch transaction by id
    getTransactionById(transactionId)
      .then(({ transaction }) => {
        if (!transaction) {
          toast.error("Transaction not found");
          return;
        }
        useTransactionModalStore.setState({ transaction });
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() =>
        useTransactionModalStore.setState({ transactionIsLoading: false })
      );
  };
  const onDeleteActionClick = () => {
    setDeleteModalIsOpen(true);
    setOnDeleteConfirm(async () => {
      const { error } = await deleteTransaction(transactionId);
      if (error) {
        toast.error(error.message);
        return;
      } else {
        toast.success("Transaction deleted successfully");
        router.refresh();
        setDeleteModalIsOpen(false);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onEditActionClick}>
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteActionClick}>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionButtons;
