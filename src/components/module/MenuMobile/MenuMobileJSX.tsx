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
import { useEffect } from "react";

export default function MenuMobileJSX() {
  const router = usePathname();

  const isOpen = useSelector((state: RootState) => state.menuMobile.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, [router]);

  return (
    <>
      <div
        className={`fixed w-[250px] z-20 bg-white dark:bg-gray-800 inset-y-0 transition-all
          ${isOpen ? "right-0" : "-right-[250px]"}`}
      >
        <div className="p-3 font-danaMed text-sm">
          <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3 dark:border-b-gray-700">
            <h2>کارین شاپ</h2>
            <IoCloseOutline size={19} onClick={() => dispatch(closeMenu())} />
          </div>

          <ul className="mt-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-x-2">
              <TbCategory size={19} />
              <p>صحفه اصلی</p>
            </Link>
            <li className="flex items-center gap-x-2">
              <TbCategory size={19} />
              <p>دسته بندی ها</p>
            </li>
            <li className="flex items-center gap-x-2">
              <RiUserLine size={19} />
              <p>حساب کاربری</p>
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
      </div>

      {isOpen && (
        <div
          onClick={() => dispatch(closeMenu())}
          className="bg-black/60 fixed inset-0 z-10"
        ></div>
      )}
    </>
  );
}
