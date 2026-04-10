import OrderT from "@/components/template/admin/Order/OrderT";
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
        path: "products.product",
        select: "price title imageUrls count",
      },
    ])
    .limit(3)
    .lean();

  console.log(orders);

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
