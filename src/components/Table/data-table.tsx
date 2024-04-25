"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { mkConfig, generateCsv, asString, CsvOutput } from "export-to-csv";
import toast from "react-hot-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  orientation?: "vertical" | "horizontal";
  options?: {
    cellHeight?: string;
  };
  disableCopy?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  orientation = "vertical",
  disableCopy,
  options = {},
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    setSorting([]);
  }, []);

  const handleClickToCopy = () => {
    const rowData = table
      .getPrePaginationRowModel()
      .rows.map((r) => r.original);

    let csvOutput: CsvOutput;

    if (orientation === "vertical") {
      csvOutput = generateCsv(mkConfig({ useKeysAsHeaders: true }))(
        rowData as any
      );
    } else {
      // transpose data
      const data: any[][] = [];
      rowData.forEach((row: any) => {
        Object.entries(row).map(([key, value], i) => {
          if (data.length <= i) {
            data.push([key]);
          }
          data[i].push(value);
        });
      });
      csvOutput = generateCsv(
        mkConfig({
          useKeysAsHeaders: true,
          showColumnHeaders: false,
        })
      )(data as any);
    }
    navigator.clipboard.writeText(asString(csvOutput));
    toast.success("Copied Table to clipboard");
  };

  if (orientation === "horizontal") {
    return (
      <div className="group relative rounded-md w-fit border">
        {disableCopy ? null : (
          <div className="z-10 opacity-0 absolute ml-auto right-5 bottom-5 group-hover:opacity-100 duration-300">
            <Button onClick={handleClickToCopy}>Coppy</Button>
          </div>
        )}
        <Table className="flex">
          <TableHeader className="border-r">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="border-none">
                {hg.headers.map((h) => (
                  <TableHead
                    key={h.id}
                    className={cn("flex items-center h-10", options.cellHeight)}
                  >
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="flex">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((r) => (
                <TableRow
                  key={r.id}
                  data-state={r.getIsSelected() && "selected"}
                  className="border-b-0 border-r"
                >
                  {r.getVisibleCells().map((c) => (
                    <TableCell
                      key={c.id}
                      className={cn(
                        "flex items-center h-10",
                        options.cellHeight
                      )}
                    >
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id}>
                  {h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((r) => (
              <TableRow key={r.id} data-state={r.getIsSelected() && "selected"}>
                {r.getVisibleCells().map((c) => (
                  <TableCell key={c.id}>
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
