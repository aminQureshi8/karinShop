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
  const cart = useSelector((state: RootState) => state.cart);
  const whish = useSelector((state: RootState) => state.whish);

  const isInCart = cart.some((item) => item.id === product._id);
  const isInWhish = whish?.some((item: any) => item.id === product._id);

  console.log(whish);

  const handleCartClick = () => {
    dispatch(
      toggleCart({
        price: product.price,
        id: product._id,
        title: product.title,
        color: "",
        imageUrls: product.imageUrls[0],
        count: 1,
        mainCount: product.count,
      }),
    );
  };

  const handleWhishClick = () => {
    dispatch(
      toggleWhish({
        price: product.price,
        id: product._id,
        title: product.title,
        color: "",
        imageUrls: product.imageUrls[0],
        count: 1,
        mainCount: product.count,
      }),
    );
  };

  return (
    <div className="bg-white shadow-xl p-4 dark:bg-slate-800 rounded-xl font-danaMed">
      <div className="relative">
        <Link href={`/productInfo/${product._id}`}>
          <Image
            width={200}
            height={200}
            src={product.imageUrls[0]}
            alt={product.title}
          />
        </Link>

        <div className="absolute right-0 top-0">
          <div className="flex items-center gap-2">
            <div
              onClick={handleCartClick}
              className={`border-2 rounded-full dark:border-gray-700 p-2 cursor-pointer flex items-center justify-center transition-all duration-300
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
              className={`border-2 rounded-full dark:border-gray-700 p-2 cursor-pointer flex items-center justify-center transition-all duration-300
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
      </div>

      <p className="line-clamp-2 text-sm my-3">{product.title}</p>

      <div className="border-t-2 border-gray-200 dark:border-gray-700 flex gap-1 items-center justify-end pt-3">
        <del className="text-xs text-gray-500">70000</del>
        <span>{product.price.toLocaleString("fa-IR")}</span>
        <span className="text-white bg-blue-500 rounded-full px-2 py-1 text-xs">
          تومان
        </span>
      </div>
    </div>
  );
}
