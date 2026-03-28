import { authRouteHandler } from "@/app/utils/auth";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const price = formData.get("price") as string;
    const discount = formData.get("discount") as string;
    const category = formData.get("category") as string;
    const subCategory = formData.get("subCategory") as string;
    const brand = formData.get("brand") as string;
    const colors = formData.get("colors") as string;
    const tags = formData.get("tags") as string;
    const features = formData.get("features") as string;
    const images = formData.getAll("images") as File[];
    const description = formData.get("description") as string;

    const imageUrls: string[] = [];

    for (const image of images) {
      if (image.size === 0) continue;

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // const uploadRes = await new Promise<any>((resolve, reject) => {
      //   cloudinary.uploader
      //     .upload_stream(
      //       {
      //         folder: "kadtinShop/products",
      //       },
      //       (error, result) => {
      //         if (error) reject(error);
      //         else resolve(result);
      //       },
      //     )
      //     .end(buffer);
      // });

      // imageUrls.push(uploadRes.secure_url || "");
      imageUrls.push("");
    }

    await productModel.create({
      title,
      slug,
      price,
      discount,
      category,
      subCategory,
      brand,
      colors,
      tags,
      features: JSON.parse(features),
      imageUrls,
      description,
    });

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const limit = 5;
    const skip = (Number(page) - 1) * limit;

    const products = await productModel.find({}).skip(skip).limit(limit).lean();

    const totalProducts = await productModel.countDocuments({});
    const totalPage = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      products,
      totalPage,
      currentPage: Number(page),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
