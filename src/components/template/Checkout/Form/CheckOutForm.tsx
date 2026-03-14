"use client";

import { RootState } from "@/app/redux/store";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function CheckOutForm({ id }: { id: string }) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const cart = useSelector((state: RootState) => state.cart);

  const orderSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const products = cart.map((c: any) => c.id).join("|");
    console.log(products);

    try {
      const res = await fetch(`/api/order?user=${id}&products=${products}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, phone }),
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={orderSubmit}>
        <div className="grid grid-cols-1">
          <div>
            <label htmlFor="">موبایل</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="">ادرس</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60 mt-2 w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <Map />
          </div>
          <div>
            <button type="submit">ثبت و پرداخت</button>
          </div>
        </div>
      </form>
    </div>
  );
}
