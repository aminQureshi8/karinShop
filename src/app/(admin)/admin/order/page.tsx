import db from "@/config/db";
import orderModel from "@/models/order";
import "@/models/order";
import "@/models/product";

export default async function page() {
  await db();

  const orders = await orderModel
    .find({})
    .populate([
      {
        path: "user",
        select: "email",
      },
      {
        path: "products",
        select: "price title",
      },
    ])
    .lean();

  console.log(orders);

  return <div>page</div>;
}
