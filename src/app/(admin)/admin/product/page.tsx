import ProductContainer from "@/components/template/admin/Product/ProductContainer";
import db from "@/config/db";
import productModel from "@/models/product";
import { memo } from "react";

const page = memo(async () => {
  await db();

  const products = await productModel.find({}, "-__v").skip(0).limit(5).lean();

  return (
    <div>
      <ProductContainer products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
});

export default page;
