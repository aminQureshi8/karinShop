import brandModel from "@/models/brand";
import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const s3Client = new S3Client({
  region: "default",
  endpoint: "https://s3.ir-thr-at1.arvanstorage.ir",
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEYID!,
    secretAccessKey: process.env.S3_SECRETKEYID!,
  },
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Access denied. Admin privileges required." },
      { status: 403 },
    );
  }

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

    const brand = await brandModel.create({
      title,
      imageUrl,
      subCategory,
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
