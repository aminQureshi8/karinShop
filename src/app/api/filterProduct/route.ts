import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const isStock = req.nextUrl.searchParams.get("isStock");
    const minPrice = req.nextUrl.searchParams.get("minPrice");
    const maxPrice = req.nextUrl.searchParams.get("maxPrice");
    const subCategory = req.nextUrl.searchParams.get("subCategory");

    const filter: any = {};

    if (isStock === "true") {
      filter.count = { $gt: 0 };
    }

    if (subCategory && subCategory !== "all") {
      filter.subCategory = subCategory;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const filterProducts = await productModel.find(filter);

    return NextResponse.json(filterProducts);
  } catch (error) {}
}
