import brandModel from "@/models/brand";
import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
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
    accessKeyId: process.env.S3_ACCESSKEYID!,
    secretAccessKey: process.env.S3_SECRETKEYID!,
  },
});

export async function POST(req: NextRequest) {
  // const token = req.cookies.get("token")?.value;
  // const isAdmin = authRouteHandler(token);

  // if (!isAdmin) {
  //   return NextResponse.json({ message: "Access denied" }, { status: 403 });
  // }

  try {
    await db();
    const formData = await req.formData();
    const subCategory = req.nextUrl.searchParams.get("subCategory");
    const title = formData.get("title") as string;
    const file = formData.get("image") as File;

    if (!title) {
      return NextResponse.json(
        { message: "Title و Image الزامی هستند" },
        { status: 400 },
      );
    }

    let imageUrl = "";

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const bucketName = "karinpub";

      const uploadParams = {
        Bucket: bucketName,
        Key: `brands/${fileName}`,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read" as any,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      imageUrl = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/brands/${fileName}`;
    }

    // const buffer = Buffer.from(await file.arrayBuffer());

    // const uploadResult = await new Promise<any>((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         folder: "karin/brand",
    //       },
    //       (error, result) => {
    //         if (error) reject(error);
    //         else resolve(result);
    //       },
    //     )
    //     .end(buffer);
    // });

    const brand = await brandModel.create({
      title,
      // imageUrl: uploadResult.secure_url || "",
      imageUrl,
      subCategory,
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    await db();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");

    const skip = (page - 1) * 6;

    const brands = await brandModel
      .find()
      .skip(skip)
      .limit(6)
      .sort({ createdAt: -1 });

    const totalBrands = await brandModel.countDocuments({});
    const totalPages = Math.ceil(totalBrands / 6);

    return NextResponse.json({ brands, totalPages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
