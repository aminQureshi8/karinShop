import productModel from "@/models/product";
import SwiperRe from "./Swiper/SwiperRe";
import { Types } from "mongoose";

export default async function Related({
  tags,
  id,
}: {
  tags: string[];
  id: string;
}) {
  const relatedProducts = await productModel
    .find({
      tags: { $in: tags },
      _id: { $ne: new Types.ObjectId(id) },
    })
    .select("title slug price mainImage")
    .limit(6)
    .lean();

  return (
    <div>
      <SwiperRe products={relatedProducts} />
    </div>
  );
}
