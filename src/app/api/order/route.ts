import orderModel from "@/models/order";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { address, phone } = await req.json();
    console.log("address --->", address);

    const user = req.nextUrl.searchParams.get("user");
    const products = req.nextUrl.searchParams.get("products");

    const splitProducts = products?.split("|");

    await orderModel.create({
      phone,
      address,
      products: splitProducts,
      user,
    });

    await productModel.updateMany(
      { _id: { $in: splitProducts } },
      {
        $inc: {
          inUserBasket: 1,
        },
      },
    );

    return NextResponse.json({
      user,
      address,
      phone,
      products: splitProducts,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
