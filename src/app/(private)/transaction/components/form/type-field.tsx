"use client";
import { UseFormReturn } from "react-hook-form";
import {
  AddTransactionFormSchema,
  transactionTypes,
} from "./add-transaction.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TypeField = ({
  form,
}: {
  form: UseFormReturn<AddTransactionFormSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select onValueChange={(e) => field.onChange(e)}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                {transactionTypes.map((type) => (
                  <SelectItem className="capitalize" value={type} key={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TypeField;
