"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";

export default function UserTable({ users }: { users: any }) {
  return (
    <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right font-bold">شماره</TableHead>
            <TableHead className="text-right font-bold">ایمیل</TableHead>
            <TableHead className="text-right font-bold">نام کاربری</TableHead>
            <TableHead className="text-right font-bold">تاریخ ایجاد</TableHead>
            <TableHead className="text-right font-bold">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any, index: any) => (
            <TableRow className="transition-colors hover:bg-muted/40">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>ویرایش</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => console.log("d")}
                    >
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
