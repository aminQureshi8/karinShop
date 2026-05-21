"use client";
import { RxDashboard } from "react-icons/rx";
import { BsBasket } from "react-icons/bs";
import { HeartIcon, Settings2Icon } from "lucide-react";
import { IoNotifications } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutBtn from "../admin/SideBar/LogOutBtn";

export default function SidebarLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5 mt-3 dark:text-gray-300">
      <div>
        <Link href="/my-account/">
          <div
            className={`flex items-center ${pathname === "/my-account" ? "bg-gray-200/80 dark:bg-gray-900 text-blue-500 " : "hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500"} gap-3 py-2 pr-2 transition-all  rounded-lg`}
          >
            <RxDashboard size={20} />
            <span className="text-sm">داشبورد</span>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/my-account/order">
          <div
            className={`flex items-center ${pathname === "/my-account/order" ? "bg-gray-200/80 dark:bg-gray-900 text-blue-500 " : "hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500"} gap-3 py-2 pr-2 transition-all  rounded-lg`}
          >
            <BsBasket size={20} />
            <span className="text-sm">سفارش ها</span>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/my-account/wish">
          <div
            className={`flex items-center ${pathname === "/my-account/wish" ? "bg-gray-200/80 dark:bg-gray-900 text-blue-500 " : "hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500"} gap-3 py-2 pr-2 transition-all  rounded-lg`}
          >
            <HeartIcon size={20} />
            <span className="text-sm">علاقه مندی ها</span>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/admin/user">
          <div
            className={`flex items-center ${pathname === "/my-account/noti" ? "bg-gray-200/80 dark:bg-gray-900 text-blue-500 " : "hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500"} gap-3 py-2 pr-2 transition-all  rounded-lg`}
          >
            <IoNotifications size={20} />
            <span className="text-sm">پیام ها</span>
          </div>
        </Link>
      </div>
      <div>
        <Link href="/my-account/information">
          <div
            className={`flex items-center ${pathname === "/my-account/information" ? "bg-gray-200/80 dark:bg-gray-900 text-blue-500 " : "hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500"} gap-3 py-2 pr-2 transition-all  rounded-lg`}
          >
            <Settings2Icon size={20} />
            <span className="text-sm">اطلاعات حساب</span>
          </div>
        </Link>
      </div>
      <LogOutBtn />
    </div>
  );
}
