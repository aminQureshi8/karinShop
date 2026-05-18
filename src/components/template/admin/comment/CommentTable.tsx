"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLayout from "@/components/module/Table/Table";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CommentTable() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const res = await fetch("/api/admin/comment");
    const data = await res.json();
    console.log(data);
    
    setComments(data);
  };

  return (
    <div>
      <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-bold">شماره</TableHead>
              <TableHead className="text-right font-bold">
                نام کاربری کاربر
              </TableHead>
              <TableHead className="text-right font-bold">محصول</TableHead>
              <TableHead className="text-right font-bold">تایید</TableHead>
              <TableHead className="text-right font-bold">تعداد لایک</TableHead>
              <TableHead className="text-right font-bold">
                تعداد دیسلایک
              </TableHead>

              <TableHead className="text-right font-bold">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((c: any, index: any) => (
              <TableRow
                key={c._id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium ss02">
                  {(currentPage - 1) * 6 + index + 1}
                </TableCell>
                <TableCell className="font-medium"></TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>
                  {new Date(c.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer"
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                      // onClick={() => {
                      //   setIsOpen(true);
                      //   setEditBrandObject(cat);
                      // }}
                      >
                        ویرایش
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        // onClick={() => removeBrand(cat._id)}
                      >
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableLayout>
      </div>
    </div>
  );
}
