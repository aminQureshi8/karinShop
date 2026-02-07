"use client";
import Table from "@/components/module/Table/Table";
import Brand from "@/types/Brand/Brand.type";
import Image from "next/image";
import BrandType from "@/types/Brand/Brand.type";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Pagination from "@/components/module/Pagination/Pagination";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
export default function TableBrand({
  children,
  brands,
  getBrands,
  totalPageState,
  setBrandState,
  intialBrand,
}: {
  children?: React.ReactNode;
  brands: Brand[];
  getBrands: any;
  totalPageState: number;
  setBrandState: any;
  intialBrand: any;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (currentPage === 1) {
      setBrandState(intialBrand);
      return;
    }

    getBrands(currentPage);
  }, [currentPage, intialBrand, setBrandState]);

  const removeBrand = async (id: string) => {
    try {
      const res = await fetch(`/api/brand/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("با موفقعیت حذف شد");
        getBrands(currentPage);
      }
    } catch (error) {}
  };
  return (
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
          {brands.map((brand: BrandType) => (
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
                  <button className="bg-blue-500 text-white p-1 rounded-lg cursor-pointer">
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
  );
}
