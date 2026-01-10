import Image from "next/image";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
export default function SwiperProduct() {
  return (
    <div className="bg-white shadow-xl p-4 dark:bg-slate-800 rounded-xl ">
      <div className=" relative">
        <Image width={200} height={200} src="/image/lap.png" />

        <div className=" absolute right-0 top-2">
          <div className="flex items-center  gap-2">
            <div className="border-2 border-gray-200 rounded-full p-2">
              <SlBasket />
            </div>
            <div className="border-2 border-gray-200 rounded-full p-2">
              <IoMdHeartEmpty />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <p className="line-clamp-2">لب تاب ایسوس</p>
      </div>
      <div className="border-t-2 border-t-gray-200 flex items-center justify-end pt-3">
        <div>تومان</div>
        <div>700000</div>
        <div>700000</div>
      </div>
    </div>
  );
}
