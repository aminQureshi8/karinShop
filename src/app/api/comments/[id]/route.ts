import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; page: string }> },
) {
  try {
    await db();

    const resolvedProblems = await params;
    const id = resolvedProblems.id;

    const isLike = req.nextUrl.searchParams.get("isLike");

    const isLikeBoolean = isLike === "true";

    const value = 1

    if (!isLikeBoolean) {
      const updatedComment = await commentModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: {
            dislikesCount: value,
          },
        },
        { new: true, select: "likesCount" },
      );

      return NextResponse.json({ updatedComment });
    } else {
      const updatedComment = await commentModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: {
            likesCount: value,
          },
        },
        { new: true, select: "likesCount" },
      );

      return NextResponse.json({ updatedComment });
    }
  } catch (error) {}
}
