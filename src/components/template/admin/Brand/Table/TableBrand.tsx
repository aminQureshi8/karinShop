"use client";
import Table from "@/components/module/Table/Table";
import Brand from "@/types/Brand/Brand.type";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "@/components/module/Pagination/Pagination";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import SwalFire from "@/app/utils/swal";
import Modal from "@/components/module/Modal/Modal";
import { useForm } from "react-hook-form";

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
  intialBrand,
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
    if (currentPage === 1) {
      setBrandState(intialBrand);
      return;
    }

    getBrands(currentPage);
  }, [currentPage, intialBrand, setBrandState, getBrands]);

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

      <div>
        <Table>
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default  border-gray-400 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                عکس برند
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                نام برند
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                تاریخ ایجاد
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: Brand) => (
              <tr
                key={brand._id}
                className="bg-neutral-primary-soft border-b border-gray-300 dark:border-gray-700 border-default hover:bg-neutral-secondary-medium"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  <div>
                    <Image
                      src={brand.imageUrl}
                      width={100}
                      height={100}
                      alt="Brand"
                    />
                  </div>
                </th>
                <td className="px-6 py-4">{brand.title}</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => removeBrand(brand._id)}
                      className="bg-red-500 text-white size-8 flex justify-center items-center rounded-lg cursor-pointer"
                    >
                      <MdDelete size={23} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setEditBrandObject(brand);
                      }}
                      className="bg-blue-500 text-white p-1 rounded-lg cursor-pointer"
                    >
                      <MdEdit size={23} className="text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {totalPageState > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPageState}
          />
        )}
      </div>
    </>
  );
}
