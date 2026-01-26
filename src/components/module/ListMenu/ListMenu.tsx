import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { memo } from "react";
const ListMenu = memo(() => {
  return (
    <div className="container mx-auto">
      <div className="bg-black max-lg:hidden text-white  dark:bg-slate-700 text-sm  font-danaMed rounded-full mt-5 p-5">
        <div className="flex justify-between items-center">
          <ul className="flex items-center gap-5 *:cursor-pointer ">
            <li className="transition-all hover:text-blue-500">صحفه اصلی</li>
            <li className="flex items-center gap-2 transition-all hover:text-blue-500">
              <p>دسته بندی ها</p>
              <MdKeyboardArrowDown />
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
