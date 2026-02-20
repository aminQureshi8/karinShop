"use client";
import { toggleCartComputer } from "@/app/redux/slices/CartComputer/CartComputer";
import { BsBasketFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
export default function Cart() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(toggleCartComputer())}
        className="cursor-pointer bg-blue-600 text-white rounded-full p-2"
      >
        <BsBasketFill size={19} />
      </button>
    </div>
  );
}
