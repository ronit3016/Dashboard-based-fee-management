"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageOpen } from "lucide-react";

interface DataTableProps<T> {
  columns: {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
  }[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  emptyMessage = "No results found",
}: DataTableProps<T>) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate remote loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-orange-900/10 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="relative w-full overflow-auto max-h-[600px] scrollbar-thin">
        <Table>
          <TableHeader className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10 shadow-sm">
            <TableRow className="border-b border-orange-900/10">
              {columns.map((col, i) => (
                <TableHead key={i} className={`font-heading font-semibold text-amber-950 ${col.className || ""}`}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`}>
                      <Skeleton className="h-6 w-full max-w-[80%] rounded-md" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 space-y-3">
                    <PackageOpen className="h-12 w-12 opacity-50" />
                    <p className="font-medium">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Actual Data
              data.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="group transition-colors hover:bg-slate-50/80 border-b border-orange-900/5 last:border-0"
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className={col.className}>
                      {col.cell 
                        ? col.cell(row) 
                        : col.accessorKey 
                          ? (row[col.accessorKey] as React.ReactNode)
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
