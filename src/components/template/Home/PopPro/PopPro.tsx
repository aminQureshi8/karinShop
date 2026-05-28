import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import db from "@/config/db";
import productModel from "@/models/product";
import { connection } from "next/server";
import { CiMobile3 } from "react-icons/ci";

export default async function PopPro() {
  await connection();
  await db();
  const products = await productModel
    .find(
      {
        sale: {
          $gte: 1,
        },
      },
      "title price mainImage slug count",
    )
    .limit(7)
    .populate("off", "percent")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="mt-12">
      <TopCategory
        title="محصولات"
        des="جدیدترین و بروزترین محصولات"
        titleColor="پرفروش"
        icon={<CiMobile3 size={22} />}
      />
      <SwiperProductContainer products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
