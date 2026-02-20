"use client"

import SwalFire from "@/app/utils/swal";
import Table from "@/components/module/Table/Table";
import Image from "next/image";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TableProduct({ products, getProducts }: any) {
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
      })

      if (res.status === 204) {
        getProducts(1)
      }
    }

  }
  return (
    <>
      <div>
        <Table>
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default  border-gray-400 bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                عکس  محصول
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                اسم محصول
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                مقدار
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((pro: any) => (
              <tr
                key={pro._id}
                className="bg-neutral-primary-soft border-b border-gray-300 dark:border-gray-700 border-default hover:bg-neutral-secondary-medium"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  <div>
                    <Image
                      src={pro.imageUrls[0]}
                      width={100}
                      height={100}
                      alt="pro"
                    />
                  </div>
                </th>
                <td className="px-6 py-4">
                  <Link href={`/productInfo/${pro._id}`}>
                    {pro.title}
                  </Link>
                </td>
                <td className="px-6 py-4">{pro.price.toLocaleString("fa-IR")}</td>
                <td className="px-6 py-4 ss02">{pro.count}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => removePro(pro._id)}
                      className="bg-red-500 text-white size-8 flex justify-center items-center rounded-lg cursor-pointer"
                    >
                      <MdDelete size={23} className="text-white" />
                    </button>
                    <button
                      // onClick={() => {
                      //   setIsOpen(true);
                      //   setEditproObject(pro);
                      // }}
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

        {/* {totalPageState > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPageState}
          />
        )} */}
      </div>

    </>
  )
}
