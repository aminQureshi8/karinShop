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
import { BiComment } from "react-icons/bi";
import LogOutBtn from "./LogOutBtn";
import { usePathname } from "next/navigation";

const SideBar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path : string) => pathname.startsWith(path);

  const activeClass = "bg-gray-50 dark:bg-gray-900 text-blue-500";

  return (
    <div className="bg-white rounded-lg dark:bg-slate-800">
      <div className="p-3">
        <div className="flex items-center justify-between border-b-2 pb-3 dark:border-gray-700 border-gray-300">
          <div className="flex items-center gap-2">
            <Image
              src="/image/user.webp"
              width={100}
              height={100}
              className="size-12 rounded-full"
              alt="No-Pic"
            />
            <div>
              <h2 className="text-base font-semibold">پارسا واصلی</h2>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                09052019751
              </p>
            </div>
          </div>
          <CiEdit size={24} className="text-blue-500" />
        </div>

        <div className="flex flex-col gap-5 mt-3 dark:text-gray-300">

     
          <Link href="/admin">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                pathname === "/admin" ? activeClass : ""
              }`}
            >
              <RxDashboard size={20} />
              <span className="text-sm">داشبورد</span>
            </div>
          </Link>

         
          <div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg cursor-pointer ${
                isActive("/admin/product") ? activeClass : ""
              }`}
            >
              <BsBasket size={20} />

              <Link
                href="/admin/product"
                className="flex items-center justify-between w-full pl-3"
              >
                <span className="text-sm">محصولات</span>
                <MdKeyboardArrowDown
                  className={`transition-all ${isOpen && "rotate-180"}`}
                />
              </Link>
            </div>

            {isOpen && (
              <div className="flex flex-col gap-2 mt-2 mr-8">
                <Link
                  href="/admin/product/createProduct"
                  className={`text-sm transition-all hover:text-blue-500 ${
                    isActive("/admin/product/createProduct")
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  ایجاد محصولات جدید
                </Link>
              </div>
            )}
          </div>

      
          <Link href="/admin/order">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/order") ? activeClass : ""
              }`}
            >
              <RxDashboard size={20} />
              <span className="text-sm">سفارشات</span>
            </div>
          </Link>

        
          <Link href="/admin/user">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/user") ? activeClass : ""
              }`}
            >
              <FaUser size={20} />
              <span className="text-sm">کاربران</span>
            </div>
          </Link>

         
          <Link href="/admin/offs">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/offs") ? activeClass : ""
              }`}
            >
              <RiDiscountPercentLine size={20} />
              <span className="text-sm">تخفیفات</span>
            </div>
          </Link>

          
          <Link href="/admin/category">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/category") ? activeClass : ""
              }`}
            >
              <MdOutlineCategory size={20} />
              <span className="text-sm">دسته بندی</span>
            </div>
          </Link>

        
          <Link href="/admin/brand">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/brand") ? activeClass : ""
              }`}
            >
              <MdOutlineCategory size={20} />
              <span className="text-sm">برند ها</span>
            </div>
          </Link>

    
          <Link href="/admin/comment">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/comment") ? activeClass : ""
              }`}
            >
              <BiComment size={20} />
              <span className="text-sm">کامنت ها</span>
            </div>
          </Link>

       
          <Link href="/admin/blog">
            <div
              className={`flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg ${
                isActive("/admin/blog") ? activeClass : ""
              }`}
            >
              <BiComment size={20} />
              <span className="text-sm">مقالات</span>
            </div>
          </Link>

          <LogOutBtn />

        </div>
      </div>
    </div>
  );
});

export default SideBar;
