import db from "@/config/db";
import blogModel from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const blogs = await blogModel
      .find({}, "title slug coverImage views createdAt")
      .lean();

    return NextResponse.json(blogs);
  } catch (error) {}
}
