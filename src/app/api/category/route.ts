import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";
import { authRouteHandler } from "@/app/utils/auth";
import categoryModel from "@/models/category";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const isAdmin = authRouteHandler(token);

    if (!isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await db();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const file = formData.get("image") as File;

    if (!title) {
      return NextResponse.json(
        { message: "Title الزامی است" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "karin/category",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const category = await categoryModel.create({
      title,
      imageUrl: uploadResult.secure_url,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await db();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");

    const skip = (page - 1) * 3;

    const categories = await categoryModel.find().skip(skip).limit(3);

    const totalCategories = await categoryModel.countDocuments({});
    const totalPages = Math.ceil(totalCategories / 3);

    return NextResponse.json({ categories, totalPages }, { status: 200 });
  } catch (error) {}
}
