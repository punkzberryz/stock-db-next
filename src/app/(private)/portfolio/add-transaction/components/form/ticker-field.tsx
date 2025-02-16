"use client";
import { UseFormReturn, useWatch } from "react-hook-form";
import { TransactionFormSchema } from "./transaction.schema";
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
  form: UseFormReturn<TransactionFormSchema>;
}) => {
  const ticker = useWatch({ control: form.control, name: "ticker" });
  if (ticker) {
    const tickerAndInfo = ticker.split("\t");
    if (tickerAndInfo.length === 6) {
      form.setValue("ticker", tickerAndInfo[0]);
      form.setValue("unit", parseFloat(tickerAndInfo[1]));
      form.setValue("price", parseFloat(tickerAndInfo[2]));
      form.setValue("fee", parseFloat(tickerAndInfo[4]));
      const dateString = tickerAndInfo[5];
      if (!dateString) return;
      const [day, month, year] = dateString.split("/");
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      console.log(date);
      form.setValue("date", date);
    }
  }
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
