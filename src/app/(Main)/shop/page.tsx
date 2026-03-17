import ContainerShop from "@/components/template/Shop/ContainerShop";
import db from "@/config/db";
import productModel from "@/models/product";

export default async function page() {
  await db();

  const products = await productModel.find({}).lean().exec();

  return (
    <div className="container mx-auto font-danaMed">
      <ContainerShop products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
