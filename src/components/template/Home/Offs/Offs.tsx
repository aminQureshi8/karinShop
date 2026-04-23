import db from "@/config/db";
import OffSwiper from "./OffSwiper";
import productModel from "@/models/product";
import { connection } from "next/server";
import offModel from "@/models/off";
import { checkAndExpireOff } from "@/app/utils/expireOff";

export default async function Offs() {
  await connection();
  await db();
  // await checkAndExpireOff();

  const activeOffs = await offModel.find({}, "_id");
  const activeOffIds = activeOffs.map((o) => o._id);

  await productModel.updateMany(
    { off: { $nin: activeOffIds } },
    { $set: { off: null, campaion: 0 } },
  );
  // ********************************

  const productsCampaion = await productModel
    .find({ campaion: { $ne: 0 } }, "title mainImage price count")
    .populate("off", "percent")
    .lean();

  const off = await offModel.find({}, "dateTime").lean();

  return (
    <>
      <OffSwiper
        dateTime={off[0]?.dateTime}
        products={JSON.parse(JSON.stringify(productsCampaion))}
      />
    </>
  );
}
