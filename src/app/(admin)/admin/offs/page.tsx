import FormOff from "@/components/template/admin/Off/FormOff";
import db from "@/config/db";
import productModel from "@/models/product";
import { connection } from "next/server";

export default async function page() {
  await connection();
  await db();

  const products = await productModel
    .find({}, "slug price mainImage campaion")
    .limit(2)
    .lean();

  const totalProducts = await productModel.countDocuments({});
  const totalPages = Math.ceil(totalProducts / 2);

  return (
    <>
      <FormOff
        products={JSON.parse(JSON.stringify(products))}
        totalPages={totalPages}
      />
    </>
  );
}
