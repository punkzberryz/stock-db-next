"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PriceToFCFChartProps {
  data: {
    year: number;
    priceToFCF: number;
  }[];
}

export const PriceToFCFChart = ({ data }: PriceToFCFChartProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Line dataKey="priceToFCF" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};
