"use client";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

export default function CheckOutCart({ post, isLoading }) {
  const carts = useSelector((state: RootState) => state.cart);

  const totalPrice = carts.reduce((pre: number, con: any) => {
    return pre + con.price * con.count;
  }, 0);

  //   const checkLogin = () => {
  //     if (!isUserLogin) {
  //       SwalFire("لطفا اول وارد شوید", "warning", false, "", "باشه");
  //       return;
  //     }

  //     redirect("/checkout");
  //   };

  const finalPrice = totalPrice + post.price;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:mt-22 shadow-md font-danaMed">
      <div className="flex items-center justify-between">
        <div>
          <p>قیمت کالاها</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="ss02">{totalPrice.toLocaleString("fa-IR")}</p>
          <span>تومان</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div>
          <p>پست پیشتاز</p>
        </div>
        <div>
          <p className="ss02">{post.price.toLocaleString("fa-IR")}</p>
        </div>
      </div>
      <div>
        <div className="w-full h-1 border border-dashed border-gray-700 dark:border-white mt-5"></div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div>
              <p>مبلغ نهایی:</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="ss02">{finalPrice.toLocaleString("fa-IR")}</p>
              <span>تومان</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          form="checkout-form"
          className="bg-blue-500 text-sm text-white mt-5 w-full p-2 rounded-lg cursor-pointer"
        >
          {isLoading ? <BeatLoader size={10} color="white" /> : "پرداخت"}
        </button>
      </div>
    </div>
  );
}
