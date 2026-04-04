"use client";
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function ProductCon() {
  const carts = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex flex-col divide-y-2 space-y-5 mt-5">
      {carts.map((cart: any) => (
        <Product {...cart} />
      ))}
    </div>
  );
}
