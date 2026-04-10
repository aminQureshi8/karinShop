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

export async function GET(req: NextRequest) {
  try {
    await db();

    const page = req.nextUrl.searchParams.get("page");
    const skip = (page - 1) * 3;

    const orders = await orderModel
      .find({})
      .skip(skip)
      .limit(3)
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
      .lean();

    const totalOrders = await orderModel.countDocuments({});
    const totalPages = Math.ceil(totalOrders / 3);

    return NextResponse.json({ orders, totalPages });
  } catch (error) {}
}

export async function PUT(req: NextRequest) {
  try {
    await db();

    const { phone, email, productCounters } = await req.json();

    const id = req.nextUrl.searchParams.get("id");

    await orderModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          phone,
          email,
          productCounters,
        },
      },
      {
        new: true,
      },
    );

    return NextResponse.json({ phone, email, productCounters, id });
  } catch (error) {}
}

export async function PATCH(req: NextRequest) {
  try {
    await db();

    const id = req.nextUrl.searchParams.get("id");
    const status = req.nextUrl.searchParams.get("status");

    await orderModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status,
        },
      },
      {
        new: true,
      },
    );

    return NextResponse.json({ message: "updated " });
  } catch (error) {}
}
