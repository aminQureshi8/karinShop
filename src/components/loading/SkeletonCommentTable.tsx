import { Skeleton } from "@/components/ui/"

<TableBody>
  {Array.from({ length: 6 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-4 w-6" />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-40" />
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-56" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-12" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="h-8 w-8 rounded-md" />
      </TableCell>
    </TableRow>
  ))}
</TableBody>;
