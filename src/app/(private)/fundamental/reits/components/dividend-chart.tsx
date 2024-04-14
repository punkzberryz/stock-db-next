"use client";

import { useEffect, useMemo, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart } from "recharts";
interface DividendChartProps {
  data: Record<number, number>;
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
    Object.entries(data).forEach(([date, dividend]) => {
      if (!data[parseInt(date) - 1]) {
        //we create an 0 dividend for the year that has no dividend
        lineData.push({ date: `${parseInt(date) - 1}`, dividend: 0 });
      }
      lineData.push({ date, dividend });
    });
    const length = lineData.length;
    return lineData.slice(1, length); // remove the first element because we have added a 0 dividend for the first year
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
