"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  BarChart,
  LineChart,
  Line,
} from "recharts";
import { toBlob } from "html-to-image";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface YearlyDividendChart {
  data: {
    year: number;
    dividend: number;
  }[];
}
const YearlyDividendChart = ({ data }: YearlyDividendChart) => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const onCopyClick = useCallback(async () => {
    if (chartRef.current === null) {
      return;
    }
    try {
      const blob = await toBlob(chartRef.current, { cacheBust: true });
      if (blob === null) {
        return;
      }
      navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      toast.success("Chart copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy chart to clipboard");
      console.error(err);
    }
  }, [chartRef]);
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
    <div className="relative w-fit group">
      <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 duration-300">
        <Button onClick={onCopyClick}>Copy</Button>
      </div>
      <div ref={chartRef} className="w-fit">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="dividend" barSize={20} fill="#413ea0" />
        </BarChart>
        <p className="text-center font-semibold text-gray-500">
          Yearly Dividends
        </p>
      </div>
    </div>
  );
};

interface DividendChartProps {
  data: {
    year: string;
    dividend: number;
  }[];
}
const DividendChart = ({ data }: DividendChartProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const onCopyClick = useCallback(async () => {
    if (chartRef.current === null) {
      return;
    }
    try {
      const blob = await toBlob(chartRef.current, { cacheBust: true });
      if (blob === null) {
        return;
      }
      navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      toast.success("Chart copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy chart to clipboard");
      console.error(err);
    }
  }, [chartRef]);
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
    <div className="relative w-fit group">
      <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 duration-300">
        <Button onClick={onCopyClick}>Copy</Button>
      </div>
      <div ref={chartRef} className="w-fit">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line dataKey="dividend" />
        </LineChart>
        <p className="text-center font-semibold text-gray-500">Dividends</p>
      </div>
    </div>
  );
};

export { YearlyDividendChart, DividendChart };
