import { authUser } from "@/app/utils/auth";
import Cart from "@/components/template/ProductInfo/Cart/Cart";
import ContainerFeCoIN from "@/components/template/ProductInfo/ContainerFeCoIN/ContainerFeCoIN";
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

  const product = await productModel
    .findById(id, { features: { $slice: 6 } })
    .lean();

  console.log(product);

  const user = await authUser();

  console.log(user);

  return (
    <div className="container mx-auto mt-10 font-danaMed">
      <div className="grid grid-cols-12 gap-5">
        <div className="max-md:col-span-12 col-span-9">
          <Info
            images={product?.imageUrls}
            colors={product.colors}
            features={product.features}
          />
        </div>
        <div className="max-md:col-span-12 col-span-3">
          <Cart
            price={product.price}
            count={product.count}
            id={product._id.toString()}
            title={product.title}
            imageUrls={product.imageUrls[0]}
          />
        </div>
      </div>
      <div className="mt-10">
        <ContainerFeCoIN
          description={product.description}
          features={product.features}
          id={product._id.toString()}
          userID={user.user._id?.toString()}
        />
      </div>
    </div>
  );
}
