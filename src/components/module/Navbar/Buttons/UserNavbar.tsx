import { authUser } from "@/app/utils/auth";
import Link from "next/link";
import { RiUserLine } from "react-icons/ri";
export default async function UserNavbar() {
  const { user } = await authUser();
  console.log(user);

  return (
    <div>
      {user ? (
        <div className="relative group">
          <button className="border-2 cursor-pointer text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
            <RiUserLine />
            حساب کاربری
          </button>

          <div className="absolute top-full invisible opacity-0 group-hover:opacity-100 group-hover:visible right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 transition-all duration-300">
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              پروفایل من
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              سفارشات من
            </Link>
            </div>
        </div>
      ) : (
        <Link href="/auth">
          <button className="border-2 cursor-pointer text-sm px-3 flex items-center gap-x-1 border-gray-200 dark:border-gray-700 rounded-full p-2">
            <RiUserLine />
            ورود / ثبت نام
          </button>
        </Link>
      )}
    </div>
  );
}
