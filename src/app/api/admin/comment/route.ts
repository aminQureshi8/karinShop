import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const comments = await commentModel
      .find({})
      .populate([
        { path: "product", select: "title" },
        { path: "user", select: "name email" },
      ])
      .lean();

    return NextResponse.json(comments);
  } catch (error) {}
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
  } catch (error) {}
}
