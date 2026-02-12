import CategoryContainer from "@/components/template/admin/Category/CategoryContainer/CategoryContainer";
import db from "@/config/db";
import categoryModel from "@/models/category";

export default async function page() {
  await db();

  const categories = await categoryModel
    .find({}, "-__v")
    .limit(3)
    .skip(0)
    .lean();

  const totalCategories = await categoryModel.countDocuments({});
  const totalPages = Math.ceil(totalCategories / 3);
  return (
    <div>
      <CategoryContainer
        categories={JSON.parse(JSON.stringify(categories))}
        totalPages={totalPages}
      />
    </div>
  );
}
