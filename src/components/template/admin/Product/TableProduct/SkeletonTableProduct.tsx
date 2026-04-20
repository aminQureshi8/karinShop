"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonTableProduct({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          {/* شماره */}
          <TableCell>
            <div className="h-4 w-6 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          {/* عکس محصول */}
          <TableCell>
            <div className="h-14 w-14 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </TableCell>

          {/* اسم محصول */}
          <TableCell>
            <div className="h-4 w-36 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          {/* قیمت */}
          <TableCell>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          {/* مقدار */}
          <TableCell>
            <div className="h-4 w-14 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          {/* عملیات (دکمه) */}
          <TableCell>
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </TableCell>

          {/* آیکون سه‌نقطه */}
          <TableCell>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
