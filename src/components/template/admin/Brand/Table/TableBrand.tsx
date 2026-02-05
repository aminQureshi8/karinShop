"use client";
import Table from "@/components/module/Table/Table";
import Brand from "@/types/Brand/Brand.type";
import Image from "next/image";



export default function TableBrand({
  children,
  brands,
}: {
  children?: React.ReactNode;
  brands: Brand[];
}) {
  
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
          {brands.map((brand: any) => (
            <tr
              key={brand._id}
              className="bg-neutral-primary-soft border-b border-gray-300 border-default hover:bg-neutral-secondary-medium"
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
                  <button className="bg-red-500 text-white p-1 rounded-lg cursor-pointer">
                    حذف
                  </button>
                  <button className="bg-blue-500 text-white p-1 rounded-lg cursor-pointer">
                    ویرایش
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
