import db from "@/config/db";
import blogModel from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const filterBlog = req.nextUrl.searchParams.get("filter");
    const category = req.nextUrl.searchParams.get("category");
    const page = req.nextUrl.searchParams.get("page");
    const skip = (page - 1) * 2;

    const filter: any = {};
    let sortQuery: any = {};

    if (filterBlog) {
      if (filterBlog === "new") {
        sortQuery = { createdAt: -1 };
      }
    }

    if (category !== "all") {
      filter.category = category;
    }

    const totalBlogs = await blogModel.countDocuments({});
    const totalPages = Math.ceil(totalBlogs / 2);

    const blogs = await blogModel
      .find(filter, "title coverImage views createdAt slug")
      .skip(skip)
      .limit(2)
      .sort(sortQuery);

    return NextResponse.json({ blogs, totalPages });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
