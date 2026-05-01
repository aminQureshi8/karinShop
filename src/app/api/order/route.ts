import orderModel from "@/models/order";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
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

    await productModel.bulkWrite(
      products.map((item: any) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { stock: -item.quantity } },
        },
      })),
    );

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
