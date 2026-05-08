import db from "@/config/db";
import blogModel from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { message: "slug is required" },
        { status: 400 },
      );
    }

    await blogModel.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

    return NextResponse.json(
      { message: "view incremented successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "server error", error },
      { status: 500 },
    );
  }
}
