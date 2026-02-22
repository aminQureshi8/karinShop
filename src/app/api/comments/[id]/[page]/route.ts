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
      .findById(id)
      .select("_id")
      .populate({
        path: "comments",
        match: { isApproved: true },
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: "user",
        },
      })
      .lean({ virtuals: true });

    const total = Array.isArray(product.comments) ? product.comments.length : 0;

    const limit = 4;
    const pageNumber = Number(page);
    const start = (pageNumber - 1) * limit;
    const end = pageNumber * limit;

    const comments = product.comments.slice(start, end);

    return NextResponse.json({
      comments,
      page,
      total,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
