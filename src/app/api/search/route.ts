import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const query = req.nextUrl.searchParams.get("query");

    const findProducts = await productModel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { slug: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10); // برای جلوگیری از نتایج زیاد، محدود کنیم

    return NextResponse.json({ findProducts });
  } catch (error) {}
}
