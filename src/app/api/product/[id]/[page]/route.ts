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

    console.log(page);

    await db();

    const product = await productModel
      .findOne({ _id: id })
      .select("features")
      .lean();

    console.log("product", product);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const topFeatures = Array.isArray(product.features)
      ? product.features.slice(0, parseInt(6 + 2))
      : [];

    return NextResponse.json({
      features: topFeatures,
      page,
      featuresLength: topFeatures.length,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
