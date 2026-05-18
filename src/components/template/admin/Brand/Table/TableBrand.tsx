"use client";
import Table from "@/components/module/Table/Table";
import Brand from "@/types/Brand/Brand.type";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "@/components/module/Pagination/Pagination";
import SwalFire from "@/app/utils/swal";
import Modal from "@/components/module/Modal/Modal";
import { useForm } from "react-hook-form";
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
interface IFormInput {
  title: string;
  image: FileList;
}

interface TableBrandProps {
  brands: Brand[];
  getBrands: (page: number) => void;
  totalPageState: number;
  setBrandState: Dispatch<SetStateAction<Brand[]>>;
  intialBrand: Brand[];
}

export default function TableBrand({
  brands,
  getBrands,
  totalPageState,
  setBrandState,
}: TableBrandProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [editBrandObject, setEditBrandObject] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<IFormInput>({
    mode: "all",
  });

  useEffect(() => {
    if (editBrandObject) {
      reset({ title: editBrandObject.title });
    }
  }, [editBrandObject, reset]);

  useEffect(() => {
    getBrands(currentPage);
  }, [currentPage]);

  const removeBrand = async (id: string) => {
    const result = await SwalFire(
      "آیا مطمئن هستید؟",
      "warning",
      true,
      "انصراف",
      "بله، حذف کن!",
    );

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/brand/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (res.ok) {
          getBrands(currentPage);
          SwalFire(
            "با موفقیت انجام شد!",
            "success",
            false,
            "",
            "باشه",
            "#3085d6",
            undefined,
            5000,
            true,
          );
        }
      } catch (error) {
        console.error("Failed to remove brand:", error);
      }
    }
  };

  const editBrand = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      setIsLoading(true);
      if (!editBrandObject) return;
      const res = await fetch(`/api/brand/${editBrandObject._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (res.status === 403) {
        SwalFire(
          "شما دسترسی لازم را ندارید!",
          "error",
          false,
          "",
          "باشه",
          "#3085d6",
          undefined,
          5000,
          true,
        );
        return;
      }

      if (res.ok) {
        setIsOpen(false);
        getBrands(currentPage);
        SwalFire(
          "با موفقیت انجام شد!",
          "success",
          false,
          "",
          "باشه",
          "#3085d6",
          undefined,
          5000,
          true,
        );
      }
    } catch (error) {
      console.error("Failed to edit brand:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ویرایش برند"
        onAccept={handleSubmit(editBrand)}
        isLoading={isLoading}
        acceptLabel="تغییر"
        declineLabel="لغو"
        onDecline={() => {
          setIsOpen(false);
          setEditBrandObject(null);
        }}
      >
        <>
          <div className="space-y-4">
            <div>
              <input
                {...register("title", { required: "پر کردن فیلد الزامی است" })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="نام برند"
              />
            </div>
            <div>
              <input
                type="file"
                {...register("image", { required: "پر کردن فیلد الزامی است" })}
                className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="نام برند"
              />
            </div>
          </div>
        </>
      </Modal>

      {brands.length === 0 ? (
        <div className="flex justify-center">برندی وجود ندارد!</div>
      ) : (
        <div className="rounded-xl border bg-white dark:bg-gray-800 shadow-sm">
          <TableLayout>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-bold">شماره</TableHead>
                <TableHead className="text-right font-bold">
                  عکس دسته بندی
                </TableHead>
                <TableHead className="text-right font-bold">
                  نام دسته بندی
                </TableHead>
                <TableHead className="text-right font-bold">
                  تاریخ ایجاد
                </TableHead>

                <TableHead className="text-right font-bold">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((cat: any, index: any) => (
                <TableRow
                  key={cat._id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="font-medium ss02">
                    {(currentPage - 1) * 6 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Image
                      src={cat.imageUrl}
                      width={100}
                      height={100}
                      alt="Image"
                    />
                  </TableCell>
                  <TableCell>{cat.title}</TableCell>
                  <TableCell>
                    {new Date(cat.createdAt).toLocaleDateString("fa-IR")}
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
                            setEditBrandObject(cat);
                          }}
                        >
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => removeBrand(cat._id)}
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
      )}

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
