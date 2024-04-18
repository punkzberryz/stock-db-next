export const formatCurrency = (
  value: number,
  options: {
    currency?: "USD" | "THB";
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
    currencyDisplay: "symbol",
  }).format(Number(value));
};

export const valueToCurrency = (value?: number) => {
  if (!value) return "-";
  return formatCurrency(value, {
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
  });
};
export const valueToUnit = (value?: number) => {
  if (!value) return "-";
  return formatCurrency(value, {
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
    style: "decimal",
  });
};
export const valueToPercent = (value?: number) => {
  if (value === undefined) return "-"; //value can be 0, so we need to check undefined
  return formatCurrency(value, {
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
    style: "percent",
  });
};
