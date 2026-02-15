"use client";
import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { BsBasket } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
const SideBar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg dark:bg-slate-800">
      <div className="p-3">
        <div className="flex items-center justify-between border-b-2 pb-3 dark:border-gray-700 border-gray-300">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src="/image/user.webp"
                width={100}
                height={100}
                className="size-12 rounded-full"
                alt="No-Pic"
              />
            </div>
            <div>
              <h2 className="text-base font-semibold">پارسا واصلی</h2>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                09052019751
              </p>
            </div>
          </div>
          <div>
            <CiEdit size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-3 dark:text-gray-300">
          <div>
            <Link href="/admin/">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <RxDashboard size={20} />
                <span className="text-sm">داشبورد</span>
              </div>
            </Link>
          </div>
          <div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg cursor-pointer"
            >
              <BsBasket size={20} />
              <div className="flex items-center justify-between w-full pl-3">
                <span className="text-sm">محصولات</span>
                <MdKeyboardArrowDown
                  className={` transition-all ${isOpen && "rotate-180"}`}
                />
              </div>
            </div>
            {isOpen && (
              <div className="flex flex-col gap-2 mt-2 mr-8">
                <Link
                  href="/admin/product/createProduct"
                  className="text-sm hover:text-blue-500 transition-all"
                >
                  ایجاد محصولات جدید
                </Link>
              </div>
            )}
          </div>
          <div>
            <Link href="/admin/dashboard">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <RxDashboard size={20} />
                <span className="text-sm">سفارشات</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/admin/dashboard">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <FaUser size={20} />
                <span className="text-sm">کاربران</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/admin/dashboard">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <RiDiscountPercentLine size={20} />
                <span className="text-sm">تخفیفات</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/admin/category">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <MdOutlineCategory size={20} />
                <span className="text-sm">دسته بندی</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/admin/brand">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <MdOutlineCategory size={20} />
                <span className="text-sm">برند ها</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SideBar;
