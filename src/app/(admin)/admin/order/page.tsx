import OrderTable from "@/components/template/admin/Order/OrderTable";
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
        select: "price title imageUrls count",
      },
    ])
    .lean();

  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  );
}
