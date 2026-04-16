import db from "@/config/db";
import OffSwiper from "./OffSwiper";
import productModel from "@/models/product";

export default async function Offs() {
  await db();

  const productsCampaion = await productModel
    .find({ campaion: { $ne: 0 } }, "title mainImage price count campaion")
    .lean();

  return (
    <>
      <OffSwiper products={JSON.parse(JSON.stringify(productsCampaion))} />
    </>
  );
}
