import { authUser } from "@/app/utils/auth";
import Link from "next/link";
import { RiUserLine } from "react-icons/ri";
import Logout from "./Logout";
export default async function UserNavbar() {
  const { user } = await authUser();
  const isUser = Boolean(user);

  return (
    <div>
      {isUser ? (
        <div className="relative group">
          <button className="border-2 cursor-pointer text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
            <RiUserLine />
            حساب کاربری
          </button>

          <div className="absolute text-sm top-full invisible opacity-0 group-hover:opacity-100 group-hover:visible right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 transition-all duration-300">
            {user.role === "ADMIN" ? (
              <Link
                href="/admin"
                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                پنل ادمین
              </Link>
            ) : (
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                پروفایل من
              </Link>
            )}

            <Link
              href=""
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              سفارشات من
            </Link>

            <div className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">
              <Logout />
            </div>
          </div>
        </div>
      ) : (
        <Link href="/register/auth">
          <button className="border-2 cursor-pointer text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
            <RiUserLine />
            ورود / ثبت نام
          </button>
        </Link>
      )}
    </div>
  );
}
