"use client";
import { IoCloseOutline } from "react-icons/io5";
import { closeMenu } from "@/app/redux/slices/MenuMobile/MenuMobile";
import { TbCategory } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import type { RootState } from "@/app/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function MenuMobileJSX() {
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
          {/* Main Menu */}
          <div
            className={`transition-transform duration-300 ${
              categorySection === null ? "translate-x-0" : "-translate-x-[107%]"
            }`}
          >
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3 dark:border-b-gray-700">
              <h2>کارین شاپ</h2>
              <IoCloseOutline
                size={19}
                onClick={() => {
                  dispatch(closeMenu());
                  setCategorySection(null);
                }}
              />
            </div>

            <ul className="mt-5 flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-x-2">
                <TbCategory size={19} />
                <p>صحفه اصلی</p>
              </Link>
              <Link href="/shop" className="flex items-center gap-x-2">
                <TbCategory size={19} />
                <p>فروشگاه</p>
              </Link>
              <li className="flex items-center gap-x-2">
                <RiUserLine size={19} />
                <p>حساب کاربری</p>
              </li>
              <li
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => setCategorySection("cat")}
              >
                <RiUserLine size={19} />
                <p>دسته بندی</p>
              </li>
              <li className="flex items-center gap-x-2">
                <IoHeartOutline size={19} />
                <p>علاقه مندی ها</p>
              </li>
              <li className="flex items-center gap-x-2">
                <IoCartOutline size={19} />
                <p>سبد خرید</p>
              </li>
            </ul>
          </div>

          {/* Category List */}
          <div
            className={`absolute min-h-screen inset-0 p-3 bg-white dark:bg-gray-800 transition-transform duration-300 ${
              categorySection === "cat"
                ? "translate-x-0"
                : categorySection === null
                  ? "translate-x-full"
                  : "translate-x-0"
            }`}
          >
            <div
              className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
              onClick={() => setCategorySection(null)}
            >
              <h2>دسته بندی</h2>
              <ArrowLeft size={15} />
            </div>

            <ul className="mt-5 flex flex-col gap-5">
              <li
                className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setCategorySection("mobile")}
              >
                <Image
                  src="/image/1 copy.webp"
                  fill
                  alt="دسته بندی"
                  className="object-cover"
                />
                <div className="absolute bg-blue-500 text-white p-2 text-xs">
                  <p>موبایل</p>
                </div>
              </li>
              <li
                className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setCategorySection("laptop")}
              >
                <Image
                  src="/image/2.jpg"
                  fill
                  alt="دسته بندی"
                  className="object-cover"
                />
                <div className="absolute bg-blue-500 text-white p-2 text-xs">
                  <p>لپ تاپ</p>
                </div>
              </li>
              <li
                className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setCategorySection("headphone")}
              >
                <Image
                  src="/image/4 (1).webp"
                  fill
                  alt="دسته بندی"
                  className="object-cover"
                />
                <div className="absolute bg-blue-500 text-white p-2 text-xs">
                  <p>هدفون</p>
                </div>
              </li>
              <li
                className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setCategorySection("bestseller")}
              >
                <Image
                  src="/image/3.webp"
                  fill
                  alt="دسته بندی"
                  className="object-cover"
                />
                <div className="absolute bg-blue-500 text-white p-2 text-xs">
                  <p>پرفروش ها</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Mobile Category Detail */}
          <div
            className={`absolute inset-0 min-h-screen p-3 bg-white dark:bg-gray-800 transition-transform duration-300 ${
              categorySection === "mobile"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <div
              className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
              onClick={() => setCategorySection("cat")}
            >
              <h2>موبایل</h2>
              <ArrowLeft size={15} />
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              <li className="cursor-pointer hover:text-blue-500">سامسونگ</li>
              <li className="cursor-pointer hover:text-blue-500">اپل</li>
              <li className="cursor-pointer hover:text-blue-500">شیائومی</li>
              <li className="cursor-pointer hover:text-blue-500">نوکیا</li>
            </ul>
          </div>

          {/* Laptop Category Detail */}
          <div
            className={`absolute min-h-screen inset-0 p-3 bg-white dark:bg-gray-800 transition-transform duration-300 ${
              categorySection === "laptop"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <div
              className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
              onClick={() => setCategorySection("cat")}
            >
              <h2>لپ تاپ</h2>
              <ArrowLeft size={15} />
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              <li className="cursor-pointer hover:text-blue-500">ایسوس</li>
              <li className="cursor-pointer hover:text-blue-500">لنوو</li>
              <li className="cursor-pointer hover:text-blue-500">اچ پی</li>
              <li className="cursor-pointer hover:text-blue-500">دل</li>
            </ul>
          </div>

          {/* Headphone Category Detail */}
          <div
            className={`absolute min-h-screen inset-0 p-3 bg-white dark:bg-gray-800 transition-transform duration-300 ${
              categorySection === "headphone"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <div
              className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
              onClick={() => setCategorySection("cat")}
            >
              <h2>هدفون</h2>
              <ArrowLeft size={15} />
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              <li className="cursor-pointer hover:text-blue-500">سونی</li>
              <li className="cursor-pointer hover:text-blue-500">بیتس</li>
              <li className="cursor-pointer hover:text-blue-500">جی بی ال</li>
              <li className="cursor-pointer hover:text-blue-500">سنهایزر</li>
            </ul>
          </div>

          {/* Bestseller Category Detail */}
          <div
            className={`absolute min-h-screen inset-0 p-3 bg-white dark:bg-gray-800 transition-transform duration-300 ${
              categorySection === "bestseller"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <div
              className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
              onClick={() => setCategorySection("cat")}
            >
              <h2>پرفروش ها</h2>
              <ArrowLeft size={15} />
            </div>

            <ul className="mt-5 flex flex-col gap-3">
              <li className="cursor-pointer hover:text-blue-500">محصول ۱</li>
              <li className="cursor-pointer hover:text-blue-500">محصول ۲</li>
              <li className="cursor-pointer hover:text-blue-500">محصول ۳</li>
              <li className="cursor-pointer hover:text-blue-500">محصول ۴</li>
            </ul>
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
        ></div>
      )}
    </>
  );
}
