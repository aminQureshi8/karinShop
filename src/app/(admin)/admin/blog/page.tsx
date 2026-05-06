import FormBlog from "@/components/template/admin/blog/FormBlog";
import db from "@/config/db";
import categoryModel from "@/models/category";

export default async function page() {
  await db();
  const category = await categoryModel.find({}, "title");
  return (
    <div>
      <FormBlog category={category} />
    </div>
  );
}
