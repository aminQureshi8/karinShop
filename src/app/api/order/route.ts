import { userAuthRouteHandler } from "@/app/utils/auth";
import db from "@/config/db";
import orderModel from "@/models/order";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import "@/models/product";
export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const { userId, address, phone } = body;

    const products = body.products.map((p: any) => ({
      product: p.id,
      quantity: p.quantity,
    }));

    if (!userId || !address || !phone || !products?.length) {
      return NextResponse.json(
        { message: "اطلاعات ناقص است" },
        { status: 400 },
      );
    }
    const operations = products.map((item: any) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { count: -item.quantity, sale: item.quantity } },
      },
    }));

    await productModel.bulkWrite(operations);

    const order = await orderModel.create({
      user: userId,
      phone: phone,
      address,
      products,
    });

    return NextResponse.json({ message: "order created", order });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await db();

    const token = req.cookies.get("token")?.value;
    const userId = req.nextUrl.searchParams.get("id");

    const isUser = userAuthRouteHandler(token);

    const findUser = await orderModel.find({ user: userId }).populate({
      path: "products.product",
      select: "title mainImage price",
    });

    return NextResponse.json(findUser);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
