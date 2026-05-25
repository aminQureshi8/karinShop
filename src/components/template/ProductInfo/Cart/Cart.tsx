"use client";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { BsBasketFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { toggleCart } from "@/app/redux/slices/Cart/Cart";
import { toggleCartComputer } from "@/app/redux/slices/CartComputer/CartComputer";
import { usePathname } from "next/navigation";

function Cart({
  price,
  count,
  id,
  title,
  mainImage,
  inUserBasket,
  campaion,
}: {
  price: number;
  count: number;
  id: string;
  title: string;
  mainImage: string;
  inUserBasket: number;
  campaion: number;
}) {
  const [counter, setCounter] = useState(1);

  const isInCart = useSelector((state: RootState) =>
    state.cart.some((item) => item.id === id),
  );
  const dispatch = useDispatch();

  const totalPrice = price * counter;

  const handleCartClick = () => {
    const currentColor = localStorage.getItem("color") || "نامشخص";
    dispatch(
      toggleCart({
        id,
        title,
        price,
        color: currentColor,
        mainImage,
        count: counter,
        mainCount: count,
      }),
    );
  };

  return (
    <div className="dark:bg-gray-800  lg:mt-16 rounded-lg shadow-md bg-white p-3">
      <div className="flex items-center gap-2">
        <p className="text-xl">
          {price.toLocaleString("fa-IR")}{" "}
          <span className="text-base">تومان</span>
        </p>
        {campaion !== 0 && (
          <div className="flex text-sm ss02 text-blue-500 font-semibold items-center gap-2">
            <p>{campaion}</p>
            <span>درصد تخفیف</span>
          </div>
        )}
      </div>

      {!isInCart && (
        <div
          className={`flex items-center justify-between border ${count === 0 ? " opacity-50" : ""} rounded-lg p-2 border-gray-200 dark:border-gray-600 mt-5`}
        >
          <div
            className="cursor-pointer"
            onClick={() =>
              setCounter((pre) => {
                if (pre >= count) return pre;
                return pre + 1;
              })
            }
          >
            <GoPlus className="text-green-500" size={20} />
          </div>
          <div className="select-none ss02">{counter}</div>
          <div
            className="cursor-pointer"
            onClick={() =>
              setCounter((pre) => {
                if (pre === 1) return pre;
                return pre - 1;
              })
            }
          >
            <FiMinus className="text-red-500" size={20} />
          </div>
        </div>
      )}

      <div
        className={`bg-gray-100 dark:bg-gray-900 ${count === 0 ? " opacity-50" : ""} rounded-lg p-2 flex items-center justify-between mt-5`}
      >
        <p className="text-sm">مجموع خرید:</p>
        <p className="max-xl:text-sm">
          {totalPrice.toLocaleString("fa-IR")}{" "}
          <span className="text-base max-xl:text-sm">تومان</span>
        </p>
      </div>

      {count !== 0 && inUserBasket !== 0 && !isInCart && (
        <div className="mt-5">در سبد خرید {inUserBasket}+ نفر</div>
      )}

      {count === 0 ? (
        <div className="mt-5">
          <button className="flex max-xl:text-sm items-center text-white justify-center gap-2 cursor-pointer bg-gray-500 w-full p-2 rounded-lg">
            <p>محصول موجود نمی باشد</p>
          </button>
        </div>
      ) : isInCart ? (
        <div className="mt-5">
          <button
            onClick={() => dispatch(toggleCartComputer())}
            className="flex items-center text-white justify-center gap-2 cursor-pointer bg-blue-500 w-full p-2 rounded-lg"
          >
            <p>مشاهده سبد خرید</p>
            <BsBasketFill size={19} />
          </button>
          <button
            className="bg-red-500 w-full mt-5  hover:bg-red-600 text-white px-3 py-2 rounded-lg"
            onClick={() => handleCartClick()}
          >
            حذف از سبد
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <button
            onClick={() => handleCartClick()}
            className="flex max-xl:text-sm items-center text-white justify-center gap-2 cursor-pointer bg-blue-500 w-full p-2 rounded-lg"
          >
            <p>افزودن به سبد</p>
            <BsBasketFill className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Cart);
