import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; page: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const page = resolvedParams.page;

    await db();

    const product = await productModel
      .findOne({ _id: id })
      .select("features")
      .lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const total = Array.isArray(product.features) ? product.features.length : 0;

    const limit = 6;
    const pageNumber = Number(page);
    const start = (pageNumber - 1) * limit;
    const end = pageNumber * limit;

    const topFeatures = product.features.slice(start, end);


    //* 0 ... 6
    //* 6 ... 12

    return NextResponse.json({
      features: topFeatures,
      page,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
