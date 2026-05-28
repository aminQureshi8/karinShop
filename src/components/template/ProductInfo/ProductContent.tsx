import Footer from "@/components/module/Footer/Footer";
import db from "@/config/db";
import productModel from "@/models/product";
import { notFound } from "next/navigation";
import Info from "./Info/Info";
import Kh from "./ContainerFeCoIN/Kh";
import Related from "./RelatedProduct/Related";
import CartWrapper from "./Cart/CartWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProductContent({ slug }: { slug: string }) {
  await db();

  const product = await productModel
    .findOne({ slug }, { features: { $slice: 6 } })
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
      {
        path: "category",
        select: "title",
      },
      {
        path: "subCategory",
        select: "title",
      },
      {
        path: "brand",
        select: "title",
      },
    ])
    .lean({ virtuals: true });

  if (!product) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const offPrice = product.campaion
    ? product.price - (product.price * product.campaion) / 100
    : product.price;

  return (
    <div>
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
            category={product.category.title}
            subCategory={product.subCategory.title}
            brand={product.brand.title}
          />
        </div>
        <div className="max-lg:col-span-12 col-span-3">
          <CartWrapper
            inUserBasket={product.inUserBasket}
            price={offPrice}
            count={product.count}
            id={product._id.toString()}
            title={product.title.toString()}
            imageUrls={product.imageUrls[0]}
            campaion={product.campaion}
            mainImage={product.mainImage}
          />
        </div>
      </div>
      <div className="mt-10">
        <Kh
          brand={product.brand.title}
          description={product.description.toString()}
          features={JSON.parse(JSON.stringify(product.features))}
          id={product._id.toString()}
          userID={user?.id?.toString() ?? ""}
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
