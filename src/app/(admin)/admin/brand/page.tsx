
import BrandContainer from "@/components/template/admin/Brand/BrandContainer/BrandContainer";
import db from "@/config/db";

import brandModel from "@/models/brand";
import { connection } from "next/server";

export default async function page() {
    await connection();
  
  await db();

  const brands = await brandModel.find({}, "-__v").limit(3).skip(0).lean();

  const totalBrands = await brandModel.countDocuments({});
  const totalPages = Math.ceil(totalBrands / 3);

  return (
    <div>
      <BrandContainer brands={JSON.parse(JSON.stringify(brands))} totalPages={totalPages} />
    </div>
  );
}
