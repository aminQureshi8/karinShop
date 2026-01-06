import { IoIosArrowRoundBack } from "react-icons/io";
import { TopCategoryProps } from "@/types/TopCategory";
export default function TopCategory({ title, des, icon }: TopCategoryProps) {
  return (
    <div className="font-danaMed flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="shadow-md p-2 rounded-xl">{icon}</div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">{title}</p>
          <p className="text-xs">{des}</p>
        </div>
      </div>
      <div>
        <button className="flex shadow-xl items-center px-3 py-2 text-sm rounded-full gap-2 bg-blue-500 text-white">
          <p>مشاهده همه</p>
          <IoIosArrowRoundBack size={19} />
        </button>
      </div>
    </div>
  );
}
