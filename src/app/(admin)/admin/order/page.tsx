import OrderT from "@/components/template/admin/Order/OrderT";
import db from "@/config/db";
import orderModel from "@/models/order";
import "@/models/order";
import "@/models/product";
import "@/models/user";

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
        path: "products.product",
        select: "price title imageUrls count",
      },
    ])
    .limit(3)
    .lean();

  const totalOrders = await orderModel.countDocuments({});
  const totalPages = Math.ceil(totalOrders / 3);

  return (
    <div>
      <OrderT
        orders={JSON.parse(JSON.stringify(orders))}
        totalPages={JSON.parse(JSON.stringify(totalPages))}
      />
    </div>
  );
}
