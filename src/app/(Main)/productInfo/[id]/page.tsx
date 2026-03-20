import { authUser } from "@/app/utils/auth";
import Footer from "@/components/module/Footer/Footer";
import Cart from "@/components/template/ProductInfo/Cart/Cart";
import ContainerFeCoIN from "@/components/template/ProductInfo/ContainerFeCoIN/ContainerFeCoIN";
import Info from "@/components/template/ProductInfo/Info/Info";
import Related from "@/components/template/ProductInfo/RelatedProduct/Related";
import db from "@/config/db";
import productModel from "@/models/product";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await db();

  const product = await productModel
    .findById(id, { features: { $slice: 6 } })
    .populate({
      path: "comments",
      match: { isApproved: true },

      options: {
        limit: 3,
        sort: { createdAt: -1 },
      },
      populate: {
        path: "user",
        select: "email",
      },
    })
    .lean({ virtuals: true });

  console.log(product);

  const user = await authUser();

  return (
    <div className="container mx-auto mt-10 font-danaMed">
      <div className="grid grid-cols-12 gap-5">
        <div className="max-lg:col-span-12 col-span-9">
          <Info
            breadCrumbs={product.breadCrumbs}
            images={product?.imageUrls}
            colors={product.colors}
            features={product.features}
            id={product._id.toString()}
            price={product.price}
            title={product.title}
            mainCount={product.count}
          />
        </div>
        <div className="max-lg:col-span-12 col-span-3">
          <Cart
            inUserBasket={product.inUserBasket}
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
          description={product.description.toString()}
          features={product.features}
          id={product._id.toString()}
          userID={user.user?._id?.toString()}
          comments={product.comments}
        />
      </div>
      <div className="mt-10">
        <Related
          tags={JSON.parse(JSON.stringify(product.tags))}
          id={product._id.toString()}
        />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
