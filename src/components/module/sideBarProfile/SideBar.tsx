import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { BsBasket } from "react-icons/bs";
import { HeartIcon, Settings2Icon } from "lucide-react";
import { IoNotifications } from "react-icons/io5";
import { authUser } from "@/app/utils/auth";
const SideBar = memo(async () => {
  const user = await authUser();

  console.log(user);

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
            <Link href="/admin/user">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <BsBasket size={20} />
                <span className="text-sm">سفارش ها</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/admin/order">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <HeartIcon size={20} />
                <span className="text-sm">علاقه مندی ها</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/admin/user">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <IoNotifications size={20} />
                <span className="text-sm">پیام ها</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/my-account/information">
              <div className="flex items-center gap-3 py-2 pr-2 transition-all hover:bg-gray-50 hover:dark:bg-gray-900 hover:text-blue-500 rounded-lg">
                <Settings2Icon size={20} />
                <span className="text-sm">اطلاعات حساب</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SideBar;
