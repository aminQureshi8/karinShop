import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import ListMenu from "./ListMenu";
import "@/models/brand";
import { connection } from "next/server";

export default async function ListMenuContainer() {
  await connection();
  await db();

  const subCategories = await subCategoryModel
    .find({})
    .populate("brands", "title")
    .lean()
    .exec();

    // console.log(subCategories);
    
  return (
    <>
      <ListMenu subCategories={JSON.parse(JSON.stringify(subCategories))} />
    </>
  );
}
