import db from "@/config/db";
import OffSwiper from "./OffSwiper";
import productModel from "@/models/product";
import { connection } from "next/server";


export default async function Offs() {
  await connection();
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
