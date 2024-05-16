"use client";
"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import TypeField from "./type-field";
import DateField from "./date-field";
import PriceUnitAndFeeFiels from "./price-and-unit-and-fees-fields";
import TickerField from "./ticker-field";
import CurrencyField from "./currency-field";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/loading-icon";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addTransaction,
  editTransaction,
} from "@/action/transaction/transaction-repo";
import { useRouter } from "next/navigation";
import { useTransactionModalStore } from "../use-transaction-modal-store";
import {
  TransactionFormSchema,
  transactionFormSchema,
} from "./transaction.schema";

interface TransactionFormProps {
  setOpenMoal: (open: boolean) => void;
}

const TransactionForm = ({ setOpenMoal }: TransactionFormProps) => {
  const { transactionIsLoading, transaction, addOrEdit } =
    useTransactionModalStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      price: 0,
      unit: 0,
      fee: 0,
      ticker: "",
      type: "buy",
      currency: "USD",
    },
  });

  const onSubmit = async (data: TransactionFormSchema) => {
    if (data.price <= 0 || data.unit <= 0) {
      toast.error("Price and unit must be greater than 0");
      return;
    }

    setIsLoading(true);
    try {
      //Add transaction
      if (addOrEdit === "add") {
        const { error } = await addTransaction(data);
        if (error) {
          throw new Error(error.message);
        }
      } else {
        //Edit transaction
        if (!transaction?.id) {
          throw new Error("Transaction id is required");
        }
        const { error } = await editTransaction(data, transaction.id);
        if (error) {
          throw new Error(error.message);
        }
      }
      form.reset();
      router.refresh();
      toast.success(
        `Transaction ${addOrEdit === "add" ? "added" : "edited"} successfully`
      );
    } catch (err: any) {
      console.error(err.message);
      toast.error(err?.message ?? "An error occurred");
    } finally {
      setOpenMoal(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //If editing transaction, set the form values
    if (transaction) {
      form.setValue("currency", transaction.currency);
      form.setValue("price", transaction.price);
      form.setValue("unit", transaction.unit);
      form.setValue("fee", transaction.fee);
      form.setValue("date", transaction.date);
      form.setValue("ticker", transaction.ticker);
      form.setValue("type", transaction.type);
    }
  }, [form, transaction]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-8"
      >
        <div className="flex flex-col gap-4">
          <TickerField form={form} />
          <CurrencyField form={form} />
          <TypeField form={form} />
          <DateField form={form} />
          <PriceUnitAndFeeFiels form={form} />
        </div>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={isLoading}
            variant="outline"
            type="button"
            onClick={() => {
              form.reset();
              setOpenMoal(false);
            }}
            className="w-24"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} className="w-24">
            {isLoading ? <LoadingIcon /> : <span>Confirm</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;

const onFormError = (error: FieldErrors<TransactionFormSchema>) => {
  toast.error("Please fill all the required fields");
  error.ticker && toast.error("Ticker is required");
  error.currency && toast.error("Currency is required");
  error.type && toast.error("Type is required");
  error.date && toast.error("Date is required");
  error.price && toast.error("Price is required");
  error.unit && toast.error("Unit is required");
  error.fee && toast.error("Fee is required");
};
