"use client";
import {
  closeCart,
  toggleCartComputer,
} from "@/app/redux/slices/CartComputer/CartComputer";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CartNavbar() {
  const [carts, setCarts] = useState([]);
  const router = usePathname();
  const isOpen = useSelector((state: RootState) => state.cartComputer.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeCart());
  }, [router]);

  useEffect(() => {
    const getLocalStorageCart = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    setCarts(getLocalStorageCart);
  }, [isOpen]);

  const addCount = (id: number, mainCount: number) => {
    setCarts((prev: any) => {
      const updated = prev.map((item: any) =>
        item.id === id && item.count < mainCount
          ? { ...item, count: item.count + 1 }
          : item,
      );
      localStorage.setItem("cart", JSON.stringify(updated));

      return updated;
    });
  };

  const minusCount = (id: number, mainCount: number) => {
    setCarts((prev: any) => {
      const updated = prev.map((item: any) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item,
      );
      localStorage.setItem("cart", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <>
      <div
        onClick={() => dispatch(toggleCartComputer())}
        className={`fixed inset-0 ${
          isOpen ? "fixed" : "hidden"
        } bg-black/60 z-40`}
      ></div>
      <div
        className={`fixed top-0 transition-all ${
          isOpen ? "left-0" : "-left-80"
        }  w-[320px] text-sm z-50 bottom-0 bg-white dark:bg-slate-800 shadow-lg overflow-y-auto max-lg:hidden font-danaMed`}
      >
        <div className="p-4 h-full flex flex-col">
          {" "}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-b-gray-600 pb-3 mb-4 sticky top-0 z-10">
            <h2 className="text-lg font-bold">سبد خرید ({carts.length})</h2>
            <button
              aria-label="بستن سبد خرید"
              className="text-gray-600 cursor-pointer transition-colors hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
              onClick={() => dispatch(toggleCartComputer())}
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
          <div className="grow space-y-4 overflow-y-auto pr-2">
            {carts.length > 0 ? (
              carts.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-start border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="shrink-0 ml-2">
                    <Image
                      width={80}
                      height={80}
                      src={item.imageUrls}
                      alt={item.title}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  <div className="grow min-w-0 space-y-2">
                    <p className="text-sm font-medium dark:text-white  line-clamp-2 text-gray-800">
                      {item.title}
                    </p>

                    <div className="text-sm font-bold text-blue-600 flex items-center justify-between">
                      <div className="border-2 dark:border-gray-700 border-gray-200 rounded-xl flex items-center gap-5 px-2 py-2 text-xs">
                        <div
                          onClick={() => minusCount(item.id, item.mainCount)}
                        >
                          -
                        </div>
                        <div>{item.count}</div>
                        <div onClick={() => addCount(item.id, item.mainCount)}>
                          +
                        </div>
                      </div>
                      <p>
                        {(item.price * item.count).toLocaleString("fa-IR")}{" "}
                        <span>تومان</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 pt-10">
                سبد خرید شما خالی است.
              </p>
            )}
          </div>
          {!(carts.length === 0) && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700 border-gray-300 sticky bottom-0 z-10">
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between items-center text-base font-bold">
                  <p className="text-gray-700 dark:text-gray-300">
                    مبلغ قابل پرداخت:
                  </p>
                  <p className="text-blue-700 dark:text-blue-500">
                    {carts
                      .reduce(
                        (total: any, item: any) =>
                          total + item.price * item.count,
                        0,
                      )
                      .toLocaleString("fa-IR")}
                    <span>تومان</span>
                  </p>
                </div>
              </div>
              <div>
                <Link href="/order">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg p-3 text-white font-bold text-base transition-colors shadow-md">
                    ثبت سفارش
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
