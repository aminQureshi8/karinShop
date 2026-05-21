"use client";

import Modal from "@/components/module/Modal/Modal";
import Pagination from "@/components/module/Pagination/Pagination";
import TableLayout from "@/components/module/Table/Table";
import { Button } from "@/components/ui/button";
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
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";

export default function UserTable() {
  const [userState, setUserState] = useState([]);
  const [totalPageState, setTotalPageState] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editUserObject, setEditUserObject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userClick, setUserClick] = useState([]);

  const getUser = async () => {
    const res = await fetch(`/api/admin/user?page=${currentPage}`);
    const data = await res.json();
    setUserState(data.users);
    setTotalPageState(data.totalPages);
  };

  useEffect(() => {
    getUser();
  }, [currentPage]);

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
        getUser();
        setIsOpen(false);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const removeMany = async () => {
    const splitUsers = userClick.map((p) => p).join("|");
    try {
      const res = await fetch(`/api/admin/user?id=${splitUsers}`, {
        method: "DELETE",
      });

      if (res.ok) {
        getUser();
        setUserClick([]);
      }
    } catch (error) {}
  };

  const clickUser = (id: string, check: any) => {
    if (check) {
      const finds = userClick.some((p) => p === id);
      if (!finds) {
        setUserClick((pre: any) => [...pre, id]);
      }
    } else {
      setUserClick((pre: any) => pre.filter((p: any) => p !== id));
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
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                <div className="relative h-6 flex items-center justify-center overflow-hidden">
                  <span
                    className={`absolute transition-all duration-300 ${
                      userClick.length === 0
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4"
                    }`}
                  >
                    انتخاب
                  </span>

                  <span
                    className={`absolute transition-all duration-300 ${
                      userClick.length !== 0
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <MdDelete
                      onClick={removeMany}
                      size={18}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    />
                  </span>
                </div>
              </TableHead>
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
            {userState.map((user: any, index: any) => (
              <TableRow
                key={user._id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={userClick.includes(user._id)}
                    onChange={(e) => clickUser(user._id, e.target.checked)}
                  />
                </TableCell>
                <TableCell className="font-medium ss02">
                  {(currentPage - 1) * 10 + index + 1}
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
        </TableLayout>
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
