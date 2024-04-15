"use client";

import { useEffect, useMemo, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart } from "recharts";
interface DividendChartProps {
  data: Map<number, number>;
}
const DividendChart = ({ data }: DividendChartProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  const lineData = useMemo(() => {
    const lineData: { date: string; dividend: number }[] = [];
    data.forEach((dividend, date) => {
      lineData.push({ date: date.toString(), dividend });
    });
    const length = lineData.length;
    //We remove the last element due to previous data fill the last element with placeholder data
    return lineData.slice(0, length - 1);
  }, [data]);

  if (!isMounted) {
    return null;
  }
  return (
    <BarChart width={600} height={300} data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="dividend" barSize={20} fill="#413ea0" />
    </BarChart>
  );
};

export default DividendChart;
