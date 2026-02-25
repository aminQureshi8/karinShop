import productModel from "@/models/product";
import SwiperRe from "./Swiper/SwiperRe";

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
      _id: { $ne: id },
    })
    .select("title slug price imageUrls")
    .limit(6)
    .lean();

  console.log("relatedProducts --> ", relatedProducts);

  return (
    <div>
      <SwiperRe products={relatedProducts} />
    </div>
  );
}
