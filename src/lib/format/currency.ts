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
