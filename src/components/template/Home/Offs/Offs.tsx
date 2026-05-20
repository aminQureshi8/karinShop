import db from "@/config/db";
import OffSwiper from "./OffSwiper";
import productModel from "@/models/product";
import { connection } from "next/server";
import offModel from "@/models/off";

export default async function Offs() {
  await connection();
  await db();

  const validOffs = await offModel
    .find({ dateTime: { $gte: new Date() } })
    .lean();

 

  if (!validOffs.length) {
    return null;
  }

  const validOffIds = validOffs.map((o) => o._id);

  const productsCampaion = await productModel
    .find(
      {
        campaion: { $ne: 0 },
        off: { $in: validOffIds },
      },
      "title mainImage price count campaion",
    )
    .populate({
      path: "off",
      match: { dateTime: { $gte: new Date() } },
      select: "percent dateTime",
    })
    .lean();

  const validProducts = productsCampaion.filter((p) => p.off !== null);

  if (!validProducts.length) {
    return null;
  }

  const latestDateTime = validOffs.reduce(
    (latest, off) =>
      new Date(off.dateTime) > new Date(latest) ? off.dateTime : latest,
    validOffs[0].dateTime,
  );

  return (
    <OffSwiper
      dateTime={latestDateTime}
      products={JSON.parse(JSON.stringify(validProducts))}
    />
  );
}
