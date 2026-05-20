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
import SkeletonTableComments from "@/components/loading/SkeletonTableComments";
import Pagination from "@/components/module/Pagination/Pagination";

export default function CommentTable() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageState, setTotalPageState] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const res = await fetch(`/api/admin/comment?page=${currentPage}`);
      const data = await res.json();
      setComments(data.comments);
      setTotalPageState(data.totalPage);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const acceptCommentOrDeny = async (isAccept: boolean, id: string) => {
    const res = await fetch(`/api/admin/comment/${id}?isAccept=${isAccept}`, {
      method: "PATCH",
    });

    if (res.ok) getComments();
  };

  const banUser = async (userId: string, commentId: string, ban: boolean) => {
    if (!ban) {
      banUserOperation(userId, commentId, ban, "", "آن بن");
      return;
    }
    const result = await Swal.fire({
      title: "علت بن کاربر:",
      input: "text",
      inputPlaceholder: "دلیل بن را وارد کنید",
      confirmButtonText: "تایید",
      showCancelButton: true,
      cancelButtonText: "لغو",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "لطفا دلیل بن را وارد کنید";
        }
        return null;
      },
    });

    if (result.isConfirmed) {
      const banReason = result.value;

      banUserOperation(userId, commentId, ban, banReason, "بن");
    }
  };

  const banUserOperation = async (
    userId: string,
    commentId: string,
    ban: boolean,
    banReason: string,
    swalMessage: string,
  ) => {
    const res = await fetch(
      `/api/admin/user/ban?id=${userId}&commentID=${commentId}&ban=${ban}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ banReason }),
      },
    );

    const data = await res.json();

    if (res.ok) {
      await Swal.fire({
        icon: "success",
        title: "موفق",
        text: `کاربر با موفقعیت ${swalMessage} شد`,
        confirmButtonText: "باشه",
      });
      getComments();
    } else {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: data.message || "مشکلی در بن کردن کاربر به وجود آمد",
        confirmButtonText: "متوجه شدم",
      });
    }
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
            {isLoading ? (
              <SkeletonTableComments />
            ) : comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  کامنتی پیدا نشد
                </TableCell>
              </TableRow>
            ) : (
              comments.map((c: any, index: any) => (
                <TableRow
                  key={c._id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="font-medium ss02">
                    {(currentPage - 1) * 7 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium align-middle">
                    <div className="flex items-center gap-2">
                      <span>{c.user.email}</span>
                      {c.isBan && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/50 dark:text-red-300 ring-1 ring-inset ring-red-600/20">
                          بن
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <p
                      className="text-xs truncate w-60"
                      title={c.product.title}
                    >
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
                        {c.isBan ? (
                          <DropdownMenuItem
                            onClick={() => banUser(c.user._id, c._id, false)}
                            className="flex justify-end cursor-pointer"
                          >
                            آن بن کردن کاربر
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => banUser(c.user._id, c._id, true)}
                            className="flex justify-end cursor-pointer"
                          >
                            بن کاربر
                          </DropdownMenuItem>
                        )}

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
              ))
            )}
          </TableBody>
        </TableLayout>
      </div>
      {totalPageState > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPageState}
        />
      )}
    </div>
  );
}
