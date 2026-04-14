"use client";
import { toggleCartComputer } from "@/app/redux/slices/CartComputer/CartComputer";
import { RootState } from "@/app/redux/store";
import { BsBasketFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart);

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
