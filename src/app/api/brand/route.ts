import db from "@/config/db";
import brandModel from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");

    const skip = (page - 1) * 6;

    const brands = await brandModel
      .find()
      .skip(skip)
      .limit(6)
      .sort({ createdAt: -1 });

    const totalBrands = await brandModel.countDocuments({});
    const totalPages = Math.ceil(totalBrands / 6);

    return NextResponse.json({ brands, totalPages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
