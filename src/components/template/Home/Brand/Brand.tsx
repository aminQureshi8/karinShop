import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import BrandSwiper from "./BrandSwiper";
import db from "@/config/db";
import brandModel from "@/models/brand";

export default async function Brand() {
  await db();
  const brands = await brandModel.find({}, "-__v").lean();
  return (
    <div className="mt-12">
      <TopCategory
        title="جدید ترین محصولات"
        des="جدیدترین و بروزترین محصولات"
        icon={<CiMobile3 size={22} />}
      />
      <BrandSwiper brands={JSON.parse(JSON.stringify(brands))} />
    </div>
  );
}
