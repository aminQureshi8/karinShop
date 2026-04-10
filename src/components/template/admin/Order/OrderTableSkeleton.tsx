"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function OrderTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell>
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </TableCell>

          <TableCell>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
