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
import Swal from "sweetalert2";

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

  const acceptCommentOrDeny = async (isAccept: boolean, id: string) => {
    const res = await fetch(`/api/admin/comment/${id}?isAccept=${isAccept}`, {
      method: "PATCH",
    });

    if (res.ok) getComments();
  };

  const banUser = async (id: string) => {
    Swal.fire({
      title: "علت بن کاربر:",
      input: "text",
      confirmButtonText: "تایید",
    }).then((res) => {
      if (res.isConfirmed) {
        console.log("f");
      }
    });
  };

  const showBodyComment = (comment: string) => {
    Swal.fire({
      title: "متن کانت",
      text: comment,
      confirmButtonText: "دیدم",
    });
  };

  return (
    <div>
      <div></div>
      <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <TableLayout>
          <TableHeader>
            <TableRow className="">
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
              <TableHead className="text-right font-bold">تاریخ</TableHead>

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
                <TableCell className="font-medium">{c.user.email}</TableCell>
                <TableCell>
                  <p className="text-xs truncate w-60" title={c.product.title}>
                    {c.product.title}
                  </p>
                </TableCell>
                <TableCell>
                  {/* {new Date(c.createdAt).toLocaleDateString("fa-IR")} */}
                  {c.isApproved ? (
                    <p className="text-green-500">شده</p>
                  ) : (
                    <p className="text-red-500">نشده</p>
                  )}
                </TableCell>
                <TableCell className="font-medium ss02">
                  {c.likesCount}
                </TableCell>
                <TableCell className="font-medium ss02">
                  {c.dislikesCount}
                </TableCell>
                <TableCell className="font-medium">
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
                        onClick={() => showBodyComment(c.comment)}
                        className="flex justify-end cursor-pointer"
                      >
                        تماشا
                      </DropdownMenuItem>
                      {!c.isApproved ? (
                        <DropdownMenuItem
                          onClick={() => acceptCommentOrDeny(true, c._id)}
                          className="flex justify-end cursor-pointer"
                        >
                          تایید
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => acceptCommentOrDeny(false, c._id)}
                          className="flex justify-end cursor-pointer"
                        >
                          عدم تایید
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        onClick={() => banUser(c._id)}
                        className="flex justify-end cursor-pointer"
                      >
                        بن کاربر
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        className="flex justify-end cursor-pointer"
                        // onClick={() => removeCategory(cat._id)}
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
