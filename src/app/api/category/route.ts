import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";
import { authRouteHandler } from "@/app/utils/auth";
import categoryModel from "@/models/category";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "default", // آروان معمولا روی دکمه default هست یا هر چی تو پنل زده
  endpoint: "https://s3.ir-thr-at1.arvanstorage.ir", // آدرس اصلی بدون نام باکت
  credentials: {
    accessKeyId: "e69db9fc-d4a0-47f1-81e2-d556e2846ae6", // از پنل کپی کن
    secretAccessKey:
      "72400bfa4d81ade44cb80d5e89cd9ddf794dc6cd1dc314da19c4eb69fb5670c5", // از پنل کپی کن
  },
});
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

export async function POST(req: NextRequest) {
  try {
    // const token = req.cookies.get("token")?.value;
    // const isAdmin = authRouteHandler(token);

    // if (!isAdmin) {
    //   return NextResponse.json({ message: "Access denied" }, { status: 403 });
    // }

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
    const fileName = `${Date.now()}-${file.name}`; // اسم یکتا برای جلوگیری از جایگزینی
    const bucketName = "karinpub";

    const uploadParams = {
      Bucket: bucketName,
      Key: `categories/${fileName}`, // مسیری که فایل ذخیره میشه
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read" as any, // اگه میخوای مستقیم با لینک قابل مشاهده باشه
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const imageUrl = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/categories/${fileName}`;

    // const buffer = Buffer.from(await file.arrayBuffer());

    // const uploadResult = await new Promise<any>((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         folder: "karin/category",
    //       },
    //       (error, result) => {
    //         if (error) reject(error);
    //         else resolve(result);
    //       },
    //     )
    //     .end(buffer);
    // });

    const category = await categoryModel.create({
      title,
      // imageUrl: uploadResult.secure_url,
      imageUrl,
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
