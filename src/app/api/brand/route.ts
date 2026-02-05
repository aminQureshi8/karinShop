import brandModel from "@/models/brand";
import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { authRouteHandler } from "@/app/utils/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAdmin = authRouteHandler(token);

  if (!isAdmin) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  try {
    await db();
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const file = formData.get("image") as File;

    if (!title || !file) {
      return NextResponse.json(
        { message: "Title و Image الزامی هستند" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "karin/brand",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const brand = await brandModel.create({
      title,
      imageUrl: uploadResult.secure_url,
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await db();

    const brands = await brandModel.find({}, "-__v").lean();

    return NextResponse.json(brands);
  } catch (error) {}
}
