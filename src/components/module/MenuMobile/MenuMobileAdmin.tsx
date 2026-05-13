"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import type { RootState } from "@/app/redux/store";
import { closeMenu } from "@/app/redux/slices/MenuMobile/MenuMobile";

import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BsBasket } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

type Category = {
  id: string;
  title: string;
  image: string;
  items: string[];
};

type Props = {
  categories: Category[];
};

export default function MenuMobileAdmin({ isUser, user }: Props) {
  const [categorySection, setCategorySection] = useState<string | null>(null);

  const router = usePathname();

  const isOpen = useSelector((state: RootState) => state.menuMobile.isOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, [router]);

  return (
    <>
      <div
        className={`fixed w-[300px] z-20 bg-white dark:bg-gray-800 inset-y-0 transition-all max-sm:overflow-auto overflow-hidden
        ${isOpen ? "right-0" : "-right-[300px]"}`}
      >
        <div className="p-3 font-danaMed text-sm relative">
          <div>
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3 dark:border-b-gray-700">
              <div>
                <Link href="/" className=" text-xl font-morabbaReg">
                  <span className="text-blue-500">کارین </span>
                  <span>شاپ</span>
                </Link>
              </div>

              <IoCloseOutline
                size={19}
                onClick={() => {
                  dispatch(closeMenu());
                  setCategorySection(null);
                }}
              />
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
                //   onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg cursor-pointer"
                >
                  <BsBasket size={20} />
                  <Link
                    href="/admin/product"
                    className="flex items-center justify-between w-full pl-3"
                  >
                    <span className="text-sm">محصولات</span>
                    <MdKeyboardArrowDown
                    //   className={` transition-all ${isOpen && "rotate-180"}`}
                    />
                  </Link>
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
                <Link href="/admin/order">
                  <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                    <RxDashboard size={20} />
                    <span className="text-sm">سفارشات</span>
                  </div>
                </Link>
              </div>
              <div>
                <Link href="/admin/user">
                  <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                    <FaUser size={20} />
                    <span className="text-sm">کاربران</span>
                  </div>
                </Link>
              </div>
              <div>
                <Link href="/admin/offs">
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
              <div>
                <Link href="/admin/comment">
                  <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                    <BiComment size={20} />
                    <span className="text-sm">کامنت ها</span>
                  </div>
                </Link>
              </div>
              <div>
                <Link href="/admin/blog">
                  <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                    <BiComment size={20} />
                    <span className="text-sm">مقالات</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => {
            dispatch(closeMenu());
            setCategorySection(null);
          }}
          className="bg-black/60 fixed inset-0 z-10"
        />
      )}
    </>
  );
}
