"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import type { RootState } from "@/app/redux/store";
import { closeMenu } from "@/app/redux/slices/MenuMobile/MenuMobile";

import Link from "next/link";
import Image from "next/image";

import { IoCloseOutline, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";

import CategorySection from "./CategorySection";

type Category = {
  id: string;
  title: string;
  image: string;
  items: string[];
};

type Props = {
  categories: Category[];
};

export default function MenuMobileClient({ categories, isUser, user }: Props) {
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
          <div
            className={`transition-transform duration-300 ${
              categorySection === null ? "translate-x-0" : "-translate-x-[107%]"
            }`}
          >
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

            <ul className="mt-5 flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-x-2">
                <TbCategory size={19} />
                <p>صفحه اصلی</p>
              </Link>

              <Link href="/shop" className="flex items-center gap-x-2">
                <TbCategory size={19} />
                <p>فروشگاه</p>
              </Link>
              {isUser ? (
                user.role === "ADMIN" ? (
                  <Link href="/admin" className="flex items-center gap-x-2">
                    <RiUserLine size={19} />
                    <p>پنل ادمین</p>
                  </Link>
                ) : (
                  <li className="flex items-center gap-x-2">
                    <RiUserLine size={19} />
                    <p>پروفایل من</p>
                  </li>
                )
              ) : (
                <Link
                  href="/regLogin/auth"
                  className="flex items-center gap-x-2"
                >
                  <RiUserLine size={19} />
                  <p>ورود | ثبت نام</p>
                </Link>
              )}

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
              categorySection === "cat" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              className="flex items-center gap-2 border-b-2 border-gray-200 pb-3 dark:border-b-gray-700 cursor-pointer"
              onClick={() => setCategorySection(null)}
            >
              <h2>دسته بندی</h2>
            </div>

            <ul className="mt-5 flex flex-col gap-5">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setCategorySection(cat.id)}
                >
                  <Image
                    src={cat.image}
                    fill
                    alt={cat.title}
                    className="object-cover"
                  />

                  <div className="absolute bg-blue-500 text-white p-2 text-xs">
                    <p>{cat.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Sections */}
          {categories.map((cat) => (
            <CategorySection
              key={cat.id}
              title={cat.title}
              items={cat.items}
              active={categorySection === cat.id}
              onBack={() => setCategorySection("cat")}
            />
          ))}
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
