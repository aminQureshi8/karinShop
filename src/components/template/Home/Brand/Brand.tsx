import TopCategory from "@/components/module/Home/TopCategory/TopCategory";
import { CiMobile3 } from "react-icons/ci";
import BrandSwiper from "./BrandSwiper";
import db from "@/config/db";
import { getBrands } from "@/lib/getBrands";
import { BadgeInfo } from "lucide-react";

export default async function Brand() {
  await db();
  const brands = await getBrands();
  return (
    <div className="mt-12">
      <TopCategory
        title="محبوب ترین"
        des="جدیدترین و بروزترین برندها"
        titleColor="برند ها"
        icon={<BadgeInfo size={22} />}
      />
      <BrandSwiper brands={JSON.parse(JSON.stringify((brands)))} />
    </div>
  );
}
