import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";
import "@/models/product";
export async function GET(req: NextRequest) {
  try {
    await db();

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const skip = (page - 1) * 7;

    const comments = await commentModel
      .find({})
      .populate([
        { path: "product", select: "title" },
        { path: "user", select: "name email" },
      ])
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(7)
      .lean();

    const totalComments = await commentModel.countDocuments({});
    const totalPage = Math.ceil(totalComments / 7);

    return NextResponse.json({ comments, totalPage });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while fetching comments." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await db();

    const id = req.nextUrl.searchParams.get("id");

    const splitIds = id?.split("|");

    await commentModel.deleteMany({
      _id: { $in: splitIds },
    });

    return NextResponse.json(splitIds);
  } catch (error) {
    
  }
}
