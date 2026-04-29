"use client";

import { RootState } from "@/app/redux/store";
import { provinces } from "@/lib/iranProvinces";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CheckOutForm({ id }: { id: string }) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");

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
    <div className="mt-5 bg-white shadow-md dark:bg-gray-800 p-3 rounded-xl">
      <form onSubmit={orderSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="نام*"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="نام خانوادگی*"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <select
              name=""
              id=""
              onChange={(e) => setProvince(e.target.value)}
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option>استان*</option>
              {provinces.map((p, index) => (
                <option key={index} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name=""
              id=""
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="-1">شهر مورد نظر را انتخاب کنید</option>
              {provinces
                .find((p) => p.name === province)
                ?.cities.map((c, index) => (
                  <option key={index}>{c}</option>
                ))}
            </select>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              placeholder="ادرس*"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="کد پستی*"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="تلفن*"
              className="bg-gray-100 ss02 text-sm dark:bg-black/60  w-full rounded-lg p-2 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
