"use client";

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import SwiperProduct from "../../Home/SwiperProduct/SwiperProduct";

export default function WhishProduct() {
  const whish = useSelector((state: RootState) => state.whish);
  return (
    <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-5">
      {whish.map((pro: any) => (
        <div key={pro._id}>
          <SwiperProduct product={pro} />
        </div>
      ))}
    </div>
  );
}
