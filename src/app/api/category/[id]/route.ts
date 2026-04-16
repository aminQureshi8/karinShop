import { authRouteHandler } from "@/app/utils/auth";
import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import categoryModel from "@/models/category";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    const isAdmin = authRouteHandler(token);
    if (!isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await db();
    await categoryModel.findOneAndDelete({ _id: id });


    return NextResponse.json(
      { message: "Brand deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    const isAdmin = authRouteHandler(token);
    if (!isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    await db();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const file = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json(
        { message: "Title الزامی است" },
        { status: 400 },
      );
    }

    let imageUrl = "";

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "karin/brand" }, (error, result) =>
            error ? reject(error) : resolve(result),
          )
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    } else {
      const existingCategory = await categoryModel.findById(id);
      if (!existingCategory) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 },
        );
      }
      imageUrl = existingCategory.imageUrl;
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true },
    );

    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}
