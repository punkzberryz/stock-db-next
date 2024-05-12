"use client";
import { UseFormReturn } from "react-hook-form";
import { AddTransactionFormSchema } from "./add-transaction.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const TickerField = ({
  form,
}: {
  form: UseFormReturn<AddTransactionFormSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="ticker"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ticker</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const LabelAndText = ({ label, text }: { label: string; text: string }) => {
  return (
    <div className="flex justify-between">
      <p>{label}</p>
      <p>{text}</p>
    </div>
  );
};

export default TickerField;
