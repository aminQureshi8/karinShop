"use client";
import SkeletonSwiperProduct from "@/components/loading/SkeletonSwiperProduct";
import SwiperProduct from "../../Home/SwiperProduct/SwiperProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function WhishProduct() {
  const wish = useSelector((state: RootState) => state.whish);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-5">
        <SkeletonSwiperProduct />
      </div>
    );
  }

  if (wish.length === 0) {
    return <div className="text-center py-10">لیست علاقه‌مندی خالی است</div>;
  }

  return (
    <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-5">
      {wish.map((pro: any) => (
        <div key={pro._id}>
          <SwiperProduct product={pro} />
        </div>
      ))}
    </div>
  );
}
