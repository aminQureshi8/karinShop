"use client";
import { clearCart } from "@/app/redux/slices/Cart/Cart";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
export default function Success() {
  const dispatch = useDispatch();
  const router = useRouter();

  const backToHome = () => {
    dispatch(clearCart());
    router.push("/");
  };

  return (
    <div className="flex justify-center font-danaMed">
      <div className="bg-white shadow-md w-96 relative dark:bg-gray-800 p-3 rounded-xl">
        <div className="absolute left-0 right-0 flex justify-center -top-6">
          <div className="bg-green-500 p-2 rounded-full size-12 flex items-center justify-center text-white">
            <Check />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-b-2 pb-5 mt-8">
          <h2 className="text-green-500 font-semibold">
            پرداخت شما موفقیت امیز بود.
          </h2>
          <p className="text-sm">جزییات تراکنش:</p>
        </div>
        <div className="text-sm mt-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p>درگاه پرداختی:</p>
            <p>بانک سامان</p>
          </div>
          <div className="flex items-center justify-between">
            <p>تاریخ تراکنش:</p>
            <p>1404/4/2</p>
          </div>
          <div className="flex items-center justify-between">
            <p>شماره پیگیری:</p>
            <p>2938433</p>
          </div>
          <div className="flex items-center  justify-between">
            <p>وضیعت:</p>
            <p className="text-green-500">پرداخت موفق</p>
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-3">
          <div>
            <button
              onClick={backToHome}
              className="bg-blue-500 text-white py-2 text-sm rounded-xl px-5 cursor-pointer"
            >
              بازگشت
            </button>
          </div>
          <div>
            <button className="bg-gray-300 text-gray-500  py-2 text-sm rounded-xl px-5 cursor-pointer">
              پیگیری
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
