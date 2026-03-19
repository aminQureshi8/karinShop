"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { memo, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import SubCate from "./SubCate";
import Ui from "./Ui";
const ListMenu = memo(({ subCategories }: { subCategories: any }) => {
  return (
    <div className="container mx-auto">
      <div className="bg-black max-lg:hidden text-white  dark:text-gray-300 dark:bg-slate-800 text-sm  font-danaMed rounded-full mt-5 p-5">
        <div className="flex justify-between items-center">
          <ul className="flex items-center gap-5 *:cursor-pointer ">
            <Link href="/">
              <li className="transition-all hover:text-blue-500">صحفه اصلی</li>
            </Link>
            <li className="relative group">
              <div className="transition-all flex items-center gap-2 hover:text-blue-500">
                <p>دسته بندی ها</p>
                <MdKeyboardArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
              </div>
<Ui   subCategories={subCategories}  />
              
            </li>
            <Link href="/shop" className="transition-all hover:text-blue-500">
              فروشگاه
            </Link>

            <li className="transition-all hover:text-blue-500">وبلاگ</li>
          </ul>
          <div className="flex items-center gap-x-2">
            <IoLocationOutline size={19} />
            <p>ادرس خود را وارد کنید</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ListMenu;
