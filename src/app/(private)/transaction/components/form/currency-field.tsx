"use client";
import { UseFormReturn, useWatch } from "react-hook-form";
import {
  AddTransactionFormSchema,
  currencyTypes,
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

const CurrencyField = ({
  form,
}: {
  form: UseFormReturn<AddTransactionFormSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Currency</FormLabel>
          <FormControl>
            <Select
              // value={field.value}
              onValueChange={(e) => field.onChange(e)}
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyTypes.map((type) => (
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

export default CurrencyField;
