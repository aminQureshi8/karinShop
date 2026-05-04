import db from "@/config/db";
import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
import productModel from "@/models/product";
import { connection } from "next/server";
import offModel from "@/models/off";

export default async function NewProduct() {
  await connection();

  await db();
  const activeOffs = await offModel.find({}, "_id");
  const activeOffIds = activeOffs.map((o) => o._id);

  await productModel.updateMany(
    { off: { $nin: activeOffIds } },
    { $set: { off: null, campaion: 0 } },
  );

  const products = await productModel
    .find({}, "title price mainImage slug count")
    .limit(10)
    .populate("off", "percent")
    .sort({ createdAt: -1 })
    .lean();

    console.log(products);
    

  return (
    <div className="mt-12">
      <TopCategory
        title="جدید ترین"
        titleColor="محصولات"
        des="جدیدترین و بروزترین محصولات"
        icon={<CiMobile3 size={22} />}
      />
      <SwiperProductContainer products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
