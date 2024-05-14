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
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const DateField = ({
  form,
}: {
  form: UseFormReturn<AddTransactionFormSchema>;
}) => {
  const [date, setDate] = useState<Date | undefined>(form.getValues("date"));

  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <Calendar
              selected={date}
              onSelect={(date) => {
                if (!date) return;
                setDate(date);
                field.onChange(date);
              }}
              mode="single"
              className="border rounded-md w-fit"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateField;
