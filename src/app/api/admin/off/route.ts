import db from "@/config/db";
import offModel from "@/models/off";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const option = req.nextUrl.searchParams.get("option");
    const products = req.nextUrl.searchParams.get("products");
    const { dateTime, percent } = await req.json();
    if (option === "all") {
      await offModel.deleteMany({});
      const off = await offModel.create({
        dateTime,
        percent: JSON.parse(percent),
        type: "all",
      });
      await productModel.updateMany(
        {},
        { $set: { off: off._id, campaion: JSON.parse(percent) } },
      );
    }

    if (option === "many") {
      const getProducts = products?.split("|");

      const off = await offModel.create({
        dateTime,
        percent: JSON.parse(percent),
        type: "many",
      });

      await productModel.updateMany(
        { _id: { $in: getProducts } },
        {
          $set: {
            off: off._id,
            campaion: JSON.parse(percent),
          },
        },
      );
    }

    return NextResponse.json({ dateTime, percent, option, products });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await db();

    const page = req.nextUrl.searchParams.get("page");
    const limit = 2;

    const skip = (Number(page) - 1) * limit;
    const products = await productModel
      .find({}, "slug price mainImage campaion")
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await productModel.countDocuments({});
    const totalPage = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, totalPage });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
