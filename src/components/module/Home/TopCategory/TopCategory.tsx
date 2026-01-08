import { IoIosArrowRoundBack } from "react-icons/io";
import { TopCategoryProps } from "@/types/TopCategory";

export default function TopCategory({ title, des, icon }: TopCategoryProps) {
  return (
    <div className="font-danaMed flex items-start md:items-center justify-between">
      <div className="flex items-start max-md:justify-center w-full gap-3">
        <div className="shadow-md p-2 rounded-xl shrink-0 max-md:hidden">
          {icon}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xl max-md:text-sm">{title}</p>
          <p className="text-xs">{des}</p>

          <div className="flex justify-center">
            <button className="md:hidden mt-2 flex w-fit items-center  gap-2 px-3 py-2 text-xs rounded-full bg-blue-500 text-white shadow-xl">
              <span>مشاهده همه</span>
              <IoIosArrowRoundBack size={18} />
            </button>
          </div>
        </div>
      </div>

      <button className="hidden md:flex shadow-xl items-center px-3 text-nowrap py-2 text-xs rounded-full gap-2 bg-blue-500 text-white">
        <span>مشاهده همه</span>
        <IoIosArrowRoundBack size={19} />
      </button>
    </div>
  );
}
