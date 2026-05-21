import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonUserTable({ rows = 10 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell>
            <div className="h-4 w-6 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-2">
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-5 w-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
          </TableCell>

          <TableCell>
            <div className="h-4 w-56 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

       

          <TableCell>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
          </TableCell>

          <TableCell className="text-right">
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
