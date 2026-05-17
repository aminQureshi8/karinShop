import { authRouteHandler } from "@/app/utils/auth";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

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
    // const isAdmin = authRouteaHandler(token);
    // if (!isAdmin) {
    //   return NextResponse.json({ message: "Access denied" }, { status: 403 });
    // }

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
    const count = formData.get("count") as string;
    const mainImageFile = formData.get("mainImage") as File;

    const buffer = Buffer.from(await mainImageFile.arrayBuffer());
    const fileName = `${Date.now()}-${mainImageFile.name}`;
    const bucketName = "karinpub";

    const uploadParams = {
      Bucket: bucketName,
      Key: `products/${fileName}`,
      Body: buffer,
      ContentType: mainImageFile.type,
      ACL: "public-read" as any,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const mainImage = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/products/${fileName}`;

    const imageUrls: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.size === 0) continue;

      const buffer = Buffer.from(await image.arrayBuffer());

      const bucketName = "karinpub";

      const ext = image.name.split(".").pop();

      const fileName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: image.type,
        ACL: "public-read" as any,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      const imageUrl = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/${fileName}`;

      imageUrls.push(imageUrl);

      // const fileName = `products/${Date.now()}-${i}.${ext}`;

      // imageUrls.push(uploadRes.secure_url || "");
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
      count,
      mainImage,
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
