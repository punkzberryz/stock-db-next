import { Currency } from "../get-currency";

export const formatCurrency = (
  value: number,
  options: {
    currency?: Currency;
    notation?: Intl.NumberFormatOptions["notation"];
    maximumFractionDigits?: number;
    style?: Intl.NumberFormatOptions["style"];
  } = {}
) => {
  const {
    currency = "THB",
    notation = "compact",
    maximumFractionDigits = 0,
    style = "currency",
  } = options;
  return new Intl.NumberFormat("th-TH", {
    style,
    currency,
    notation,
    maximumFractionDigits,
    currencyDisplay: "narrowSymbol",
  }).format(Number(value));
};

export const valueToCurrency = (value?: number | null, currency?: Currency) => {
  if (value === undefined || value === null) return "-"; //value can be 0, so we need to check undefined
  return formatCurrency(value, {
    currency: currency ?? "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });
};
export const valueToUnit = (value?: number | null) => {
  if (value === undefined || value === null) return "-"; //value can be 0, so we need to check undefined
  return formatCurrency(value, {
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
    style: "decimal",
  });
};
export const valueToPercent = (value?: number | null) => {
  if (value === undefined || value === null) return "-"; //value can be 0, so we need to check undefined
  return formatCurrency(value, {
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
    style: "percent",
  });
};
