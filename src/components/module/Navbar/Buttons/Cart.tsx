"use client";
import { toggleCartComputer } from "@/app/redux/slices/CartComputer/CartComputer";
import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import { BsBasketFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="size-9 bg-gray-300 animate-pulse dark:bg-gray-800  rounded-full p-2 flex items-center justify-center"
        aria-label="loading theme"
      ></button>
    );
  }

  return (
    <div>
      <button
        onClick={() => dispatch(toggleCartComputer())}
        className="cursor-pointer bg-blue-600 relative text-white rounded-full p-2"
      >
        <BsBasketFill size={19} />
        {carts.length !== 0 && (
          <div className="absolute ss02 font-semibold size-4 text-xs rounded-full bg-red-500 -left-1 -top-1">
            {carts.length}
          </div>
        )}
      </button>
    </div>
  );
}
