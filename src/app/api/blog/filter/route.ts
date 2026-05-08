import db from "@/config/db";
import blogModel from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const filterBlog = req.nextUrl.searchParams.get("filter");

    const filter: any = {};
    let sortQuery: any = {};

    if (filterBlog) {
      if (filterBlog === "new") {
        sortQuery = { createdAt: -1 };
      }
    }

    const blogs = await blogModel
      .find({}, "title coverImage views createdAt slug")
      .sort(sortQuery);

    return NextResponse.json(blogs);
  } catch (error) {}
}
