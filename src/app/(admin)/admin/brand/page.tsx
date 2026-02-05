import BrandContainer from "@/components/template/admin/Brand/BrandContainer/BrandContainer";
import db from "@/config/db";
import brandModel from "@/models/brand";

export default async function page() {
  await db();

  const brands = await brandModel.find({}, "-__v").limit(4).skip(0).lean();

  return (
    <div>
      <BrandContainer brands={JSON.parse(JSON.stringify(brands))} />
    </div>
  );
}
