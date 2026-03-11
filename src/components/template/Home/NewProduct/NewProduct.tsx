import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
import db from "@/config/db";
import productModel from "@/models/product";
export default async function NewProduct() {
  await db();

  const products = await productModel
    .find({}, "title price imageUrls slug count")
    .limit(10)
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
