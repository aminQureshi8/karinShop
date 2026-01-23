"use client";
import { toggleCart } from "@/app/redux/slices/CartComputer/CartComputer";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const mockCartItems = [
  {
    id: 1,
    name: "محصول نمونه اول",
    price: 565000,
    quantity: 1,
    imageUrl: "/image/5 (2).webp",
  },
];

export default function CartNavbar() {
  const isOpen = useSelector((state: RootState) => state.cartComputer.isOpen);
  const dispatch = useDispatch();

  const totalAmount = 1130000;
  const itemCount = mockCartItems.length;

  return (
    <div
      className={`fixed top-0 transition-all ${
        isOpen ? "left-0" : "-left-80"
      }  w-[300px] text-sm z-50 bottom-0  bg-white shadow-lg overflow-y-auto max-lg:hidden font-danaMed`}
    >
      <div className="p-4 h-full flex flex-col">
        {" "}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold">سبد خرید ({itemCount})</h2>
          <button
            aria-label="بستن سبد خرید"
            className="text-gray-600 cursor-pointer hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
            onClick={() => dispatch(toggleCart())}
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
          {" "}
          {mockCartItems.length > 0 ? (
            mockCartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start border-b border-gray-100 pb-3 last:border-b-0"
              >
                <div className="flex-shrink-0 ml-2">
                  <Image
                    width={80}
                    height={80}
                    src={item.imageUrl}
                    alt={item.name}
                    className="rounded-lg object-cover border border-gray-100"
                  />
                </div>

                <div className="flex-grow min-w-0 space-y-1">
                  <p className="text-sm font-medium  line-clamp-2 text-gray-800">
                    گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 256
                    گیگابایت و رم 4 گیگابایت - نات اکتیو
                  </p>

                  <div className="text-sm font-bold text-blue-600 flex items-center justify-between">
                    <p>
                      {item.price.toLocaleString("fa-IR")} <span>تومان</span>
                    </p>
                    <div className="border-2 border-gray-200 rounded-xl flex items-center gap-5 p-2">
                      <div>-</div>
                      <div>2</div>
                      <div>+</div>
                    </div>
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
        <div className="mt-4 pt-4 border-t border-gray-300 sticky bottom-0 bg-white z-10">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex justify-between items-center text-base font-bold">
              <p className="text-gray-700">مبلغ قابل پرداخت:</p>
              <p className="text-blue-700">
                {totalAmount.toLocaleString("fa-IR")} <span>تومان</span>
              </p>
            </div>
          </div>
          <div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg p-3 text-white font-bold text-base transition-colors shadow-md">
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
