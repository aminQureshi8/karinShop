import { authRouteHandler } from "@/app/utils/auth";
import db from "@/config/db";
import categoryModel from "@/models/category";
import subCategoryModel from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "default",
  endpoint: "https://s3.ir-thr-at1.arvanstorage.ir",
  credentials: {
    accessKeyId: "e69db9fc-d4a0-47f1-81e2-d556e2846ae6",
    secretAccessKey:
      "72400bfa4d81ade44cb80d5e89cd9ddf794dc6cd1dc314da19c4eb69fb5670c5",
  },
});

export async function POST(req: NextRequest) {
  try {
    // const token = req.cookies.get("token")?.value;
    // const isAdmin = authRouteHandler(token);

    // if (!isAdmin) {
    //   return NextResponse.json({ message: "Access denied" }, { status: 403 });
    // }

    await db();

    const { title, href, category, icon } = await req.json();

    await subCategoryModel.create({
      title,
      href,
      category,
      icon,
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

  const category = req.nextUrl.searchParams.get("cat");

  const subCategories = await subCategoryModel
    .find({ category }, "title")
    .lean();

  return NextResponse.json(subCategories);
}
