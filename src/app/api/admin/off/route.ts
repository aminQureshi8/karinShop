import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const option = req.nextUrl.searchParams.get("option");
    const { dateTime, percent } = await req.json();

    if (option === "all") {
      await productModel.updateMany(
        {},
        {
          $set: {
            campaion: percent,
          },
        },
      );
    }

    // const splitProducts = products?.split("|");

    // await offModel.create({
    //   code,
    //   products: splitProducts,
    //   percent,
    // });

    return NextResponse.json({ dateTime, percent, option });
  } catch (error) {}
}
