import orderModel from "@/models/order";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { address, phone } = body;

    if (!address || !phone) {
      return NextResponse.json(
        { message: "اطلاعات ناقص است" },
        { status: 400 },
      );
    }

    const user = req.nextUrl.searchParams.get("user");
    const products = req.nextUrl.searchParams.get("products");

    if (!user || !products) {
      return NextResponse.json(
        { message: "اطلاعات سفارش ناقص است" },
        { status: 400 },
      );
    }

    const splitProducts = products.split("|");

    const productsWithQuantity = splitProducts.map((id) => ({
      product: id,
      quantity: 1,
    }));

    const order = await orderModel.create({
      phone,
      address,
      products: productsWithQuantity,
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
      message: "order created",
      order,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
