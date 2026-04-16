import db from "@/config/db";
import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import SwiperProductContainer from "../SwiperProduct/SwiperProductContainer";
import productModel from "@/models/product";
export default async function NewProduct() {
  await db();
  const products = await productModel
<<<<<<< HEAD
    .find({}, "title price slug count off campaion mainImage")
=======
    .find({}, "title price mainImage slug count off campaion")
>>>>>>> providersFix
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
