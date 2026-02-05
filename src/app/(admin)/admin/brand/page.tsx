import FormBrand from "@/components/template/admin/Brand/Form/FormBrand";
import TableBrand from "@/components/template/admin/Brand/Table/TableBrand";
import db from "@/config/db";
import brandModel from "@/models/brand";

export default async function page() {
  await db();

  const brands = await brandModel.find({}, "-__v").limit(4).skip(0).lean();

  return (
    <div>
      <div>
        <FormBrand />
      </div>
      <div className="mt-5">
        <TableBrand brands={brands} />
      </div>
    </div>
  );
}
