"use client";

import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonTableProduct({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell>
            <div className="h-4 w-6 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-14 w-14 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-36 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-14 bg-gray-300 dark:bg-gray-600 rounded" />
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
