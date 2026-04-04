import db from "@/config/db";
import orderModel from "@/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await db();

    const orders = req.nextUrl.searchParams.get("orders");
    const isManySelect = req.nextUrl.searchParams.get("isManySelect");

    if (isManySelect === "true") {
      const splitOrders = orders?.split("|");
      await orderModel.deleteMany({
        _id: { $in: splitOrders },
      });

      return NextResponse.json({ message: "Deleted" });
    }

    return NextResponse.json({ orders });
  } catch (error) {}
}
