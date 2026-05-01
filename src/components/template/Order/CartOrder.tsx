"use client";

import { RootState } from "@/app/redux/store";
import SwalFire from "@/app/utils/swal";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function CartOrder({ isUserLogin }: { isUserLogin: boolean }) {
  const carts = useSelector((state: RootState) => state.cart);

  const totalPrice = carts.reduce((pre: number, con: any) => {
    return pre + con.price * con.count;
  }, 0);

  const checkLogin = () => {
    if (!isUserLogin) {
      SwalFire("لطفا اول وارد شوید", "warning", false, "", "باشه");
      return;
    }
    redirect("/checkout");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div>مبلغ نهایی:</div>
        <div className="flex items-center gap-1">
          <p>{totalPrice.toLocaleString("fa-IR")}</p>
          <p>تومان</p>
        </div>
      </div>
      <div className="mt-3">
        <button
          onClick={checkLogin}
          className="bg-blue-500 text-sm text-white w-full p-2 rounded-lg cursor-pointer"
        >
          تایید و تکمیل سفارش
        </button>
      </div>
    </div>
  );
}
