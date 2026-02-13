import { authRouteHandler } from "@/app/utils/auth";
import db from "@/config/db";
import categoryModel from "@/models/category";
import subCategoryModel from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const isAdmin = authRouteHandler(token);

    if (!isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await db();

    const { title, href, category } = await req.json();

    await subCategoryModel.create({
      title,
      href,
      category,
    });

    return NextResponse.json(
      { message: "SubCategory created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erorr creating subCategory" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  await db();

  const subCategories = await categoryModel
    .find()
    .populate("subCategory")
    .lean();

  return NextResponse.json({ message: subCategories });
}
