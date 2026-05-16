import { FaFire } from "react-icons/fa6";
import HotSwiperContainer from "./HotSwiper/HotSwiperContainer";
import db from "@/config/db";
import productModel from "@/models/product";
import { connection } from "next/server";

export default async function Hot() {
  await connection();
  await db();

  const products = await productModel
    .find(
      {
        sale: {
          $gte: 1,
        },
      },
      "title mainImage slug",
    )
    .limit(7)
    .sort({ createdAt: -1 })
    .lean();
  return (
    <div className="mt-12 mb-12 font-danaMed">
      <div className="bg-white dark:bg-slate-800 rounded-xl h-[450px] w-full shadow-2xl shadow-black/10 px-5">
        <div className="flex justify-center gap-3 pt-5 text-sm">
          <FaFire size={19} color="red" />
          <h2>داغ ترین چند ساعت گذشته</h2>
        </div>
        <div className="mt-5">
          <HotSwiperContainer products={JSON.parse(JSON.stringify(products))} />
        </div>
      </div>
    </div>
  );
}
