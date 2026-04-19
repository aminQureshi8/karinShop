import db from "@/config/db";
import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
import productModel from "@/models/product";
import { connection } from "next/server";

export default async function NewProduct() {
  await connection();

  await db();
  const products = await productModel
    .find({}, "title price mainImage slug count off campaion")
    .limit(10)
    .populate("off")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="mt-12">
      <TopCategory
        title="جدید ترین محصولات"
        des="جدیدترین و بروزترین محصولات"
        icon={<CiMobile3 size={22} />}
      />
      <SwiperProductContainer products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
