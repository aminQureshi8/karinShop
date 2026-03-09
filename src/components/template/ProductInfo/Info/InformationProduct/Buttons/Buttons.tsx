"use client";
import { BiHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { toggleWhish } from "@/app/redux/slices/Whish/Whish";
import { RxCross2 } from "react-icons/rx";
import { SlBasket } from "react-icons/sl";
import { toggleCart } from "@/app/redux/slices/Cart/Cart";
export default function Buttons({
  price,
  title,
  id,
  imageUrls,
  mainCount,
}: {
  price: number;
  title: string;
  id: string;
  imageUrls: string;
  mainCount: number;
}) {
  console.log(price, title, id, imageUrls, mainCount);

  const dispatch = useDispatch();

  const isInWhish = useSelector((state: RootState) =>
    state.whish.some((item: any) => item.id === id),
  );

  const isInCart = useSelector((state: RootState) =>
    state.cart.some((item) => item.id === id),
  );

  console.log(isInWhish);

  return (
    <div className="flex items-center max-sm:gap-1 gap-2 *:cursor-pointer">
      <div
        onClick={() =>
          dispatch(
            toggleWhish({
              price,
              id,
              title,
              color: "",
              imageUrls,
              count: 1,
              mainCount,
            }),
          )
        }
        className={`border-2 rounded-full dark:border-gray-700 p-2 cursor-pointer flex items-center justify-center transition-all duration-300
                ${
                  isInWhish
                    ? "border-red-400 bg-red-100 dark:bg-red-800 text-red-500"
                    : "border-gray-200 hover:bg-blue-100 dark:hover:bg-blue-500"
                }`}
      >
        {isInWhish ? (
          <RxCross2 />
        ) : (
          <BiHeart className=" text-gray-400 dark:text-gray-300" />
        )}
      </div>

      <div
        onClick={() =>
          dispatch(
            toggleCart({
              price,
              id,
              title,
              color: "",
              imageUrls,
              count: 1,
              mainCount,
            }),
          )
        }
        className={`border-2 rounded-full dark:border-gray-700 p-2 cursor-pointer flex items-center justify-center transition-all duration-300
                ${
                  isInCart
                    ? "border-red-400 bg-red-100 dark:bg-red-800 text-red-500"
                    : "border-gray-200 hover:bg-blue-100 dark:hover:bg-blue-500"
                }`}
      >
        {isInCart ? (
          <RxCross2 />
        ) : (
          <SlBasket className=" text-gray-400 dark:text-gray-300" />
        )}
      </div>
    </div>
  );
}
