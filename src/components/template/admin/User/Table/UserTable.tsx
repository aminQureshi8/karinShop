"use client";

import Modal from "@/components/module/Modal/Modal";
import Pagination from "@/components/module/Pagination/Pagination";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  image: FileList;
}

export default function UserTable({
  users,
  getUser,
  totalPageState,
  intialUsers,
  setUserState,
}: {
  users: any;
  getUser: any;
  totalPageState: number;
  intialUsers: any;
  setUserState: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserObject, setEditUserObject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUser(currentPage);
  }, [currentPage, getUser]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const removeUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/user/${id}`, {
        method: "DELETE",
      });


      if (res.ok) {
        getUser(1);
      }
    } catch (error) {}
  };
  const editUser = async (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("userName", data.userName);

    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/user/${editUserObject?._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      console.log(res);

      if (res.ok) {
        getUser(1);
        setIsOpen(false);
      }

      const result = await res.json();

      console.log(result);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ویرایش کاربر"
        onAccept={handleSubmit(editUser)}
        isLoading={isLoading}
        acceptLabel="تغییر"
        declineLabel="لغو"
        onDecline={() => {
          setIsOpen(false);
          setEditUserObject(null);
        }}
      >
        <>
          <div className="space-y-4">
            <div>
              <input
                {...register("email", { required: "پر کردن فیلد الزامی است" })}
                defaultValue={editUserObject?.email}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="ویرایش کاربر"
              />

              {errors.email && (
                <span className="text-red-500 text-xs mt-2 block">
                  {errors.email.message as string}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("userName", {
                  required: "پر کردن فیلد الزامی است",
                })}
                defaultValue={editUserObject?.userName}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </>
      </Modal>
      <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-bold">شماره</TableHead>
              <TableHead className="text-right font-bold">ایمیل</TableHead>
              <TableHead className="text-right font-bold">نام کاربری</TableHead>
              <TableHead className="text-right font-bold">نقش</TableHead>

              <TableHead className="text-right font-bold">
                تاریخ ایجاد
              </TableHead>
              <TableHead className="text-right font-bold">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any, index: any) => (
              <TableRow
                key={user._id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium ss02">
                  {(currentPage - 1) * 5 + index + 1}
                </TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString("fa-IR")}
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
                        onClick={() => {
                          setIsOpen(true);
                          setEditUserObject(user);
                        }}
                      >
                        ویرایش
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => removeUser(user._id)}
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

      {totalPageState > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPageState}
        />
      )}
    </>
  );
}
