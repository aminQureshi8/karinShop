import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import ListMenu from "./ListMenu";

export default async function ListMenuContainer() {
  await db();

  const subCategories = await subCategoryModel
    .find({})
    .populate("brands", "title")
    .lean();
  return (
    <>
      <ListMenu subCategories={subCategories} />
    </>
  );
}
