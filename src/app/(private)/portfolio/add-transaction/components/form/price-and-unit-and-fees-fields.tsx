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
import { useMemo } from "react";
import { formatCurrency } from "@/lib/format";

const PriceUnitAndFeeFiels = ({
  form,
}: {
  form: UseFormReturn<TransactionFormSchema>;
}) => {
  const [fee, price, unit, currency] = useWatch({
    control: form.control,
    name: ["fee", "price", "unit", "currency"],
  });

  const value = useMemo(() => price * unit, [price, unit]);
  const totalPrice = useMemo(() => value + fee, [value, fee]);
  const feeRatio = useMemo(() => fee / value, [fee, value]);

  return (
    <>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unit</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fee</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Price Summary */}
      <div className="flex flex-col gap-2 border p-4 rounded-md">
        <LabelAndText
          label="Value"
          text={formatCurrency(value, { currency })}
        />
        <LabelAndText
          label="Total Price"
          text={formatCurrency(totalPrice, {
            currency,
          })}
        />
        <LabelAndText
          label="Fees Ratio"
          text={formatCurrency(feeRatio, {
            style: "percent",
            maximumFractionDigits: 1,
          })}
        />
      </div>
    </>
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

export default PriceUnitAndFeeFiels;
