import Providers from "@/app/redux/Providers";
import { authUser } from "@/app/utils/auth";
import Footer from "@/components/module/Footer/Footer";
import Cart from "@/components/template/ProductInfo/Cart/Cart";
import CartWrapper from "@/components/template/ProductInfo/Cart/CartWrapper";
import Kh from "@/components/template/ProductInfo/ContainerFeCoIN/Kh";
import Info from "@/components/template/ProductInfo/Info/Info";
import Related from "@/components/template/ProductInfo/RelatedProduct/Related";
import db from "@/config/db";
import productModel from "@/models/product";

export default async function ProductContent({ id }) {
//   const { id } = await params;

  await db();

  const product = await productModel
    .findById(id, { features: { $slice: 6 } })
    .populate([
      {
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
      },
      {
        path: "off",
      },
    ])
    .lean({ virtuals: true });

  const user = await authUser();

  const offPrice = product.campaion
    ? product.price - (product.price * product.campaion) / 100
    : product.price;

  return (
    <div className="">
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
            maimImage={product.mainImage}
          />
        </div>
        <div className="max-lg:col-span-12 col-span-3">
          <CartWrapper
            inUserBasket={product.inUserBasket}
            price={offPrice}
            count={product.count}
            id={product._id.toString()}
            title={product.title}
            imageUrls={product.imageUrls[0]}
          />
        </div>
      </div>
      <div className="mt-10">
        <Kh
          description={product.description.toString()}
          features={product.features}
          id={product._id.toString()}
          userID={user.user?._id?.toString()}
          comments={product.comments}
        />
      </div>
      <div className="mt-10">
        <Related tags={product.tags} id={product._id.toString()} />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
