import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import blogModel from "@/models/blog";

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
    await db();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const author = (formData.get("author") as string) || "نامشخص";
    const excerpt = formData.get("excerpt") as string | null;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as File;

    const buffer = Buffer.from(await coverImage.arrayBuffer());
    const fileName = `${Date.now()}-${coverImage.name}`;
    const bucketName = "karinpub";

    const uploadParams = {
      Bucket: bucketName,
      Key: `blogs/${fileName}`,
      Body: buffer,
      ContentType: coverImage.type,
      ACL: "public-read" as any,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const imageUrl = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/blogs/${fileName}`;

    await blogModel.create({
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      coverImage: imageUrl,
    });

    return NextResponse.json({ message: "create" });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
