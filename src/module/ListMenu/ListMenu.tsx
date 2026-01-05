import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
function ListMenu() {
  return (
    <div className="bg-black max-lg:hidden text-white  dark:bg-slate-700 text-sm container mx-auto font-danaMed rounded-full mt-5 py-5">
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-5 *:cursor-pointer">
          <li>صحفه اصلی</li>
          <li className="flex items-center gap-2">
            <p>دسته بندی ها</p>
            <MdKeyboardArrowDown />
          </li>
          <li>فروشگاه</li>

          <li>وبلاگ</li>
        </ul>
        <div className="flex items-center gap-x-2">
          <IoLocationOutline size={19} />
          <p>ادرس خود را وارد کنید</p>
        </div>
      </div>
    </div>
  );
}

export default ListMenu;
