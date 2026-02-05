import Table from "@/components/module/Table/Table";
import Image from "next/image";
import React from "react";

export default function TableBrand({
  children,
  brands,
}: {
  children?: React.ReactNode;
}) {
  console.log(brands);

  return (
    <div>
      <Table>
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default bg-gray-50 dark:bg-gray-700">
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
              className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
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
              <td className="px-6 py-4">$2999</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
