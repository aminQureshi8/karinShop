import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { memo } from "react";
import { CiMobile1 } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
const ListMenu = memo(() => {
  return (
    <div className="container mx-auto">
      <div className="bg-black max-lg:hidden text-white  dark:text-gray-300 dark:bg-slate-700 text-sm  font-danaMed rounded-full mt-5 p-5">
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

              <div className="absolute text-sm !w-[900px] top-[180%] invisible opacity-0 translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out">
                <div className="h-80">
                  <div className="p-5 grid grid-cols-3 gap-5 h-full">
                    <div className="bg-gray-100 text-black dark:text-white dark:bg-black !h-full rounded-xl p-3">
                      <ul className="flex flex-col gap-5">
                        <li className="flex items-center gap-1">
                          <CiMobile1 size={20} />
                          <p>موبایل</p>
                        </li>
                        <li className="flex items-center gap-1">
                          <CiMobile1 size={20} />
                          <p>موبایل</p>
                        </li>
                        <li className="flex items-center gap-1">
                          <CiMobile1 size={20} />
                          <p>موبایل</p>
                        </li>
                        <li className="flex items-center gap-1">
                          <CiMobile1 size={20} />
                          <p>موبایل</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-2">
                      <div>
                        <div className="flex items-center gap-2 text-blue-500">
                          <p>مشاهده همه</p>
                          <MdKeyboardArrowLeft />
                        </div>

                        <div className="grid grid-cols-3 gap-5 text-black dark:text-white mt-3">
                          <div>
                            <h2 className="">برند های مختلف</h2>
                            <ul className="flex flex-col gap-3 mt-2">
                              <li>لب تاب</li>
                              <li>لب تاب</li>
                              <li>لب تاب</li>
                            </ul>
                          </div>
                          <div>
                            <h2 className="">برند های مختلف</h2>
                            <ul className="flex flex-col gap-3 mt-2">
                              <li>لب تاب</li>
                              <li>لب تاب</li>
                              <li>لب تاب</li>
                            </ul>
                          </div>
                          <div>
                            <h2 className="">برند های مختلف</h2>
                            <ul className="flex flex-col gap-3 mt-2">
                              <li>لب تاب</li>
                              <li>لب تاب</li>
                              <li>لب تاب</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="transition-all hover:text-blue-500">فروشگاه</li>

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
