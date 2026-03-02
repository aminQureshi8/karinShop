"use client";

import Modal from "@/components/module/Modal/Modal";
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
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  image: FileList;
}

export default function UserTable({
  users,
  getUser,
}: {
  users: any;
  getUser: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserObject, setEditUserObject] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    mode: "all",
  });
  const removeUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/user/${id}`, {
        method: "DELETE",
      });

      console.log(res);

      if (res.ok) {
        getUser(1);
      }
    } catch (error) {}
  };
  const editUser = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("userName", data.userName);
    const res = await fetch(`/api/admin/user/${editUserObject?._id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    console.log(res);

    const result = await res.json();

    console.log(result);
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
            </div>
            <div>
              <input
                type="text"
                {...register("userName", {
                  required: "پر کردن فیلد الزامی است",
                })}
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
              <TableHead className="text-right font-bold">
                تاریخ ایجاد
              </TableHead>
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
    </>
  );
}
