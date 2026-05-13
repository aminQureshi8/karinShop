import { IoIosArrowRoundBack } from "react-icons/io";
import { TopCategoryProps } from "@/types/TopCategory";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TopCategory({
  title,
  des,
  icon,
  titleColor,
}: TopCategoryProps) {
  return (
    <div className="flex items-start md:items-center justify-between">
      <div className="flex items-start max-md:justify-center w-full gap-3">
        <div className="shadow-xl bg-white dark:bg-gray-700 p-2 rounded-xl shrink-0 max-md:hidden">
          {icon}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xl max-md:text-sm flex items-center gap-1 font-morabbaReg font-semibold">
            <span className="">{title}</span>
            <span className="text-blue-500!">{titleColor}</span>
          </p>
          <p className="text-xs">{des}</p>

          <div className="flex justify-center">
            <button className="md:hidden mt-2 flex w-fit items-center  gap-2 px-3 py-2 text-xs rounded-full bg-blue-500 text-white shadow-xl">
              <span>مشاهده همه</span>
              <IoIosArrowRoundBack size={18} />
            </button>
          </div>
        </div>
      </div>

      <Link
        href="articles.html"
        className="group shadow-xl font-danaMed text-nowrap  md:text-base flex gap-x-1.5 items-center text-sm! px-2 h-10 md:px-3 text-white bg-blue-600 rounded-xl"
      >
        <p>مشاهده همه</p>
        <span className="w-7 h-7 rounded-full bg-blue-500 flex-center md:group-hover:-translate-x-1 transition-transform duration-300">
          <ArrowLeft />
        </span>
      </Link>
    </div>
  );
}
