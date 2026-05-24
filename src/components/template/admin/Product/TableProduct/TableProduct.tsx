"use client";

import SwalFire from "@/app/utils/swal";
import Table from "@/components/module/Table/Table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

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
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import Pagination from "@/components/module/Pagination/Pagination";
import SkeletonTableProduct from "./SkeletonTableProduct";

export default function TableProduct({
  products,
  getProducts,
  totalPages,
  isLoading,
}: any) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const removePro = async (id: string) => {
    const result = await SwalFire(
      "آیا مطمئن هستید؟",
      "warning",
      true,
      "انصراف",
      "بله، حذف کن!",
    );

    if (result.isConfirmed) {
      const res = await fetch(`/api/admin/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();

      console.log(result);

      if (res.ok) {
        getProducts(1);
      }
    }
  };
  return (
    <>
      <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
        <TableLayout>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-bold">شماره</TableHead>
              <TableHead className="text-right font-bold">عکس محصول</TableHead>
              <TableHead className="text-right font-bold">اسم محصول</TableHead>
              <TableHead className="text-right font-bold">قیمت</TableHead>

              <TableHead className="text-right font-bold">مقدار</TableHead>
              <TableHead className="text-right font-bold">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <SkeletonTableProduct />
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  محصولی پیدا نشد
                </TableCell>
              </TableRow>
            ) : (
              products.map((p: any, index: any) => (
                <TableRow
                  key={p._id}
                  className="transition-colors hover:bg-muted/40 ss02"
                >
                  <TableCell className="font-medium ss02">
                    {(currentPage - 1) * 3 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Image
                      src={p.mainImage}
                      width={100}
                      height={100}
                      alt="Image"
                    />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="truncate font-medium text-gray-700 dark:text-gray-200">
                      {p.title}
                    </p>
                  </TableCell>

                  <TableCell>{p.price.toLocaleString()}</TableCell>
                  <TableCell>{p.count}</TableCell>
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
                        //   setEditCategoryObject(cat);
                        // }}
                        >
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => removePro(p._id)}
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
}
