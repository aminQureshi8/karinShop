import productModel from "@/models/product";
import SwiperRe from "./Swiper/SwiperRe";
import { Types } from "mongoose";
import { normalizeTags } from "@/app/utils/getFunc";

export default async function Related({ tags, id }: { tags: any; id: string }) {
  const tagsArray = normalizeTags(tags);

  console.log("Searching for tags:", tagsArray);

  const relatedProducts = await productModel
    .find({
      tags: { $in: tagsArray },
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
