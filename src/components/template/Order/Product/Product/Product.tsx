import {
  deCreaseCounter,
  inCreaseCounter,
  toggleCart,
} from "@/app/redux/slices/Cart/Cart";
import { Minus, Plus, Truck } from "lucide-react";
import Image from "next/image";
import { FaCertificate } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

export default function Product({
  mainImage,
  price,
  count,
  mainCount,
  id,
  title,
}: {
  mainImage: string;
  price: number;
  count: number;
  mainCount: number;
  id: string;
  title: string;
}) {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-12   gap-3 w-full pb-5">
      <div className="max-sm:col-span-12 col-span-3">
        <div className="flex justify-center">
          <Image src={mainImage} width={200} height={200} alt={title} />
        </div>

        <div className="border ss02 rounded-lg flex items-center justify-between mt-2 p-2">
          <button
            onClick={() => dispatch(inCreaseCounter(id))}
            disabled={count >= mainCount}
          >
            <Plus size={17} className="text-green-500 max-sm:size-3" />
          </button>

          <div className="max-sm:text-sm">{count}</div>

          <button
            onClick={() => dispatch(deCreaseCounter(id))}
            disabled={count <= 1}
          >
            <Minus size={17} className="text-red-500 max-sm:size-3" />
          </button>
        </div>
      </div>

      <div className="max-sm:col-span-12 col-span-9">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between max-sm:gap-5">
              <h2 className="text-sm max-sm:line-clamp-1">{title}</h2>
              <button
                className="cursor-pointer"
                onClick={() => dispatch(toggleCart({ id }))}
              >
                <IoClose />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="size-3 bg-blue-500 rounded-full"></div>
              <p>ابی</p>
            </div>
            <div className="flex max-sm:text-xs items-center mt-3 gap-2 text-sm text-gray-500 dark:text-gray-500">
              <Truck className="max-sm:size-4" />
              <p>ارسال یک روز کاری</p>
            </div>
            <div className="flex max-sm:text-xs items-center mt-3 gap-2 text-sm text-gray-500 dark:text-gray-500">
              <FaCertificate className="max-sm:size-4" />
              <p>گارانتی 18 ماهه</p>
            </div>
          </div>
          <p className="mt-3 max-sm:text-xl text-2xl dark:text-gray-300 font-bold text-gray-800">
            {(price * count).toLocaleString("fa-IR")} تومان
          </p>
        </div>
      </div>
    </div>
  );
}
