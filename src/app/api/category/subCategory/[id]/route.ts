import db from "@/config/db";
import subCategoryModel from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await db();

  const findSubCategories = await subCategoryModel.find(
    { category: id },
    "title",
  );

  return NextResponse.json({ subCategories: findSubCategories });
}
