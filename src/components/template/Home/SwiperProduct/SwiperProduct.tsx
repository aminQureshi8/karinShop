"use client";

import { toggleCart } from "@/app/redux/slices/Cart/Cart";
import { RootState } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
export default function SwiperProduct() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart);
  console.log(isOpen);

  const addWhish = () => {};

  const addBasket = () => {
    dispatch(toggleCart("m"));
  };
  return (
    <div className="bg-white shadow-xl p-4 dark:bg-slate-800 rounded-xl font-danaMed ">
      <div className=" relative">
        <Image width={200} height={200} src="/image/lap.png" alt="" />

        <div className=" absolute right-0 top-2">
          <div className="flex items-center  gap-2">
            <div
              onClick={addBasket}
              className="border-2 border-gray-200 rounded-full p-2"
            >
              <SlBasket />
            </div>
            <div
              onClick={addWhish}
              className="border-2 border-gray-200 rounded-full p-2"
            >
              <IoMdHeartEmpty />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <p className="line-clamp-2 text-sm">لب تاب ایسوس</p>
      </div>
      <div className="border-t-2 border-t-gray-200 flex gap-3 items-center justify-end pt-3">
        <div className="ss02 text-xs text-gray-500">
          <del>70000</del>
        </div>
        <div className="ss02">120000</div>
        <div className="text-white bg-blue-500 rounded-full  px-2 py-1 text-xs">
          تومان
        </div>
      </div>
    </div>
  );
}
