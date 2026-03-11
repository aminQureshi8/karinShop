"use client";

import { useSelector } from "react-redux";

export default function CartOrder() {
  const carts = useSelector((state) => state.cart);

  console.log(carts);

  

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div>مبلغ نهایی:</div>
        <div className="flex items-center">
          <p>119,500,000</p>
          <p>تومان</p>
        </div>
      </div>
      <div>
        <button className="bg-blue-500 text-white w-full p-2 rounded-lg cursor-pointer">
          تایید و تکمیل سفارش
        </button>
      </div>
    </div>
  );
}
