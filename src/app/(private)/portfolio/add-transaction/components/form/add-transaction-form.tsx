"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import {
  addTransactionFormSchema,
  AddTransactionFormSchema,
} from "./add-transaction.schema";
import TypeField from "./type-field";
import DateField from "./date-field";
import PriceUnitAndFeeFiels from "./price-and-unit-and-fees-fields";
import TickerField from "./ticker-field";
import CurrencyField from "./currency-field";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/loading-icon";
import { useState } from "react";
import toast from "react-hot-toast";
import { addTransaction } from "@/action/transaction/transaction-repo";
import { useRouter } from "next/navigation";
interface AddTransactionFormProps {
  setOpenMoal: (open: boolean) => void;
}
const AddTransactionForm = ({ setOpenMoal }: AddTransactionFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AddTransactionFormSchema>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      price: 0,
      unit: 0,
      fee: 0,
      date: new Date(),
      ticker: "",
      type: "buy",
      currency: "USD",
    },
  });
  const onSubmit = async (data: AddTransactionFormSchema) => {
    if (data.price <= 0 || data.unit <= 0) {
      toast.error("Price and unit must be greater than 0");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await addTransaction(data);
      if (error) {
        console.error(error.message);
        toast.error(error.message);
        return;
      }
      form.reset();
      router.refresh();
      toast.success("Transaction added successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setOpenMoal(false);
      setIsLoading(false);
    }
  };
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
            {isLoading ? <LoadingIcon /> : <span>Continue</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTransactionForm;
const onFormError = (error: FieldErrors<AddTransactionFormSchema>) => {
  toast.error("Please fill all the required fields");
  error.ticker && toast.error("Ticker is required");
  error.currency && toast.error("Currency is required");
  error.type && toast.error("Type is required");
  error.date && toast.error("Date is required");
  error.price && toast.error("Price is required");
  error.unit && toast.error("Unit is required");
  error.fee && toast.error("Fee is required");
};
