"use client";

import { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart } from "recharts";
interface DividendChartProps {
  data: {
    year: number;
    dividend: number;
  }[];
}
const DividendChart = ({ data }: DividendChartProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="dividend" barSize={20} fill="#413ea0" />
    </BarChart>
  );
};

export { DividendChart };
