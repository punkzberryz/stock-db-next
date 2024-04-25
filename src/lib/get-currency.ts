export const getCurrencyFromSymbol = (symbol: string) => {
  const exchange = symbol.split(".")[1]?.toUpperCase();

  if (!exchange) {
    return "USD";
  }
  if (exchange === "BK") {
    return "THB";
  }
  if (exchange === "SI") {
    return "SGD";
  }
  return "USD";
};

export type Currency = ReturnType<typeof getCurrencyFromSymbol>;
