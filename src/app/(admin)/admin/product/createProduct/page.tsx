import FormProduct from "@/components/template/admin/Product/FormProduct/FormProduct";
import db from "@/config/db";
import brandModel from "@/models/brand";
import categoryModel from "@/models/category";

export default async function page() {
  await db()
  const brands = await brandModel.find({}, "title").lean();
  const categories = await categoryModel.find({}, "title").lean();

  return (
    <div>
      <FormProduct
        brands={JSON.parse(JSON.stringify(brands))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
}
