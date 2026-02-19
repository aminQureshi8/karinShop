import Cart from "@/components/template/ProductInfo/Cart/Cart";
import Info from "@/components/template/ProductInfo/Info/Info";
import db from "@/config/db";
import productModel from "@/models/product";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);


  await db();

  const product = await productModel.findById(id).lean();

  console.log(product);


  return (
    <div className="container mx-auto mt-10 font-danaMed">
      <div className="grid grid-cols-12 gap-5">
        <div className="max-md:col-span-12 col-span-9">
          <Info images={product?.imageUrls} colors={product.colors} features={JSON.parse(product.features)} />
        </div>
        <div className="max-md:col-span-12 col-span-3">
          <Cart price={product.price} />
        </div>
      </div>
    </div>
  );
}
