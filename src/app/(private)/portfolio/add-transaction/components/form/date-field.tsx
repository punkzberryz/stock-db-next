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
import { Calendar } from "@/components/ui/calendar";
import { addHours } from "date-fns";

const DateField = ({
  form,
}: {
  form: UseFormReturn<TransactionFormSchema>;
}) => {
  // const [date, setDate] = useState<Date | undefined>(form.getValues("date"));
  const date = useWatch({ control: form.control, name: "date" });
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
                field.onChange(addHours(date, 8));
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
