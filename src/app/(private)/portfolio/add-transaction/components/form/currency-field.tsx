"use client";
import { UseFormReturn, useWatch } from "react-hook-form";
import { TransactionFormSchema, currencyTypes } from "./transaction.schema";
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
import { useEffect } from "react";
import { getCurrencyFromSymbol } from "@/lib/get-currency";

const CurrencyField = ({
  form,
}: {
  form: UseFormReturn<TransactionFormSchema>;
}) => {
  const [ticker, currency] = useWatch({
    control: form.control,
    name: ["ticker", "currency"],
  });

  useEffect(() => {
    if (ticker) {
      const getCurrency = getCurrencyFromSymbol(ticker);
      form.setValue("currency", getCurrency);
    }
  }, [ticker, form]);
  return (
    <FormField
      control={form.control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Currency</FormLabel>
          <FormControl>
            <Select
              value={currency}
              onValueChange={(e) => field.onChange(e)}
              defaultValue={form.getValues("currency")}
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
