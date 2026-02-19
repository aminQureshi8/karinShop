"use client"
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { BsBasketFill } from "react-icons/bs";
import { useState } from "react";
export default function Cart({ price }: { price: number }) {
  const [counter, setCounter] = useState(1)
  return (
    <div className="dark:bg-gray-800 mt-16 rounded-lg shadow-md bg-white p-3">
      <div>
        <p className="text-xl">{price.toLocaleString("fa-IR")} <span className="text-base">تومان</span></p>
      </div>

      <div className="flex items-center justify-between border rounded-lg p-2 dark:border-gray-600 mt-5">
        <div className="cursor-pointer" onClick={() => setCounter(pre => pre + 1)}>
          <GoPlus className="text-green-500" size={20} />
        </div>
        <div className="select-none ss02">{counter}</div>
        <div className="cursor-pointer" onClick={() => setCounter(pre => {
          if (pre === 1) return pre
          return pre - 1
        })}>
          <FiMinus className="text-red-500" size={20} />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-2 flex items-center justify-between mt-5">
        <p>مجموع خرید:</p>
        <p>{(price * counter).toLocaleString("fa-IR")} <span className="text-base">تومان</span></p>
      </div>

      <div className="mt-5">
        <button className="flex items-center justify-center gap-2 cursor-pointer bg-blue-500 w-full p-2 rounded-lg">
          <p>افزودن به سبد</p>
          <BsBasketFill size={20} />
        </button>
      </div>
    </div>
  )
}
