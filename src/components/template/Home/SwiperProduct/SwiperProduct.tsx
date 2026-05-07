"use client";

import { toggleCart } from "@/app/redux/slices/Cart/Cart";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleWhish } from "@/app/redux/slices/Whish/Whish";

export default function SwiperProduct({ product }: any) {
  const dispatch = useDispatch();

  const isInCart = useSelector((state: RootState) =>
    state.cart.some((item) => item.id === product._id),
  );
  const isInWhish = useSelector((state: RootState) =>
    state.whish.some((item : any) => item._id === product._id),
  );

  const offPrice = product.off?.percent
    ? product.price - (product.price * product.off.percent) / 100
    : product.price;

  const handleCartClick = () => {
    dispatch(
      toggleCart({
        price: offPrice,
        id: product._id,
        title: product.title,
        color: "",
        mainImage: product.mainImage,
        count: 1,
        mainCount: product.count,
      }),
    );
  };

  const handleWhishClick = () => {
    dispatch(
      toggleWhish({
        price: offPrice,
        _id: product._id,
        title: product.title,
        color: "",
        mainImage: product.mainImage,
        count: 1,
        mainCount: product.count,
      }),
    );
  };



  return (
    <div className="bg-white shadow-xl p-4 overflow-hidden dark:bg-slate-800 rounded-xl font-danaMed">
      <div className="relative flex justify-center">
        <Link href={`/productInfo/${product._id}`}>
          <Image
            width={200}
            height={200}
            src={product.mainImage}
            alt={product.title}
          />
        </Link>

        {
          product.count === 0 && <div className=" absolute left-0">
            <div className="bg-gray-500 text-xs p-2 rounded-xl">
              <p>ناموجود</p>
            </div>
          </div>
        }

        <div className="absolute right-0 top-0">
          <div className="flex items-center gap-2">
            <div
              onClick={handleCartClick}
              className={`border-2 bg-white dark:bg-gray-800 rounded-full dark:border-gray-700 p-2 cursor-pointer flex items-center justify-center transition-all duration-300
                ${
                  isInCart
                    ? "border-red-400 bg-red-100 dark:bg-red-800 text-red-500"
                    : "border-gray-200 hover:bg-blue-100 dark:hover:bg-blue-500"
                }`}
            >
              {isInCart ? <RxCross2 size={13} /> : <SlBasket size={13} />}
            </div>

            <div
              onClick={handleWhishClick}
              className={`border-2 bg-white dark:bg-gray-800 rounded-full dark:border-gray-700 p-2 cursor-pointer flex items-center justify-center transition-all duration-300
                ${
                  isInWhish
                    ? "border-red-400 bg-red-100 dark:bg-red-800 text-red-500"
                    : "border-gray-200 hover:bg-blue-100 dark:hover:bg-blue-500"
                }`}
            >
              {isInWhish ? (
                <RxCross2 size={13} />
              ) : (
                <IoMdHeartEmpty size={13} />
              )}
            </div>
          </div>
        </div>
        {product.off?.percent > 0 && (
          <div className="absolute select-none top-0 z-30 -left-4 flex items-center gap-2">
            <span className="text-blue-500 text-xs font-danaMed font-bold">
              %{product.off?.percent} تخفیف
            </span>

            <div className="w-1.5 h-8 bg-blue-500 rounded-r-md"></div>
          </div>
        )}
      </div>

      <p className="line-clamp-2 text-sm my-3 leading-6">{product.title}</p>

      <div className="border-t-2 border-gray-200 dark:border-gray-700 flex gap-1 items-center justify-end pt-3">
        <del className="text-xs text-gray-500">
          {product?.off?.percent !== 0 && product.price.toLocaleString("fa-IR")}
        </del>
        <span>{offPrice.toLocaleString("fa-IR")}</span>
        <span className="text-white bg-blue-500 rounded-full px-2 py-1 text-xs">
          تومان
        </span>
      </div>
    </div>
  );
}
