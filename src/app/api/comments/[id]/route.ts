import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; page: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    const user = req.nextUrl.searchParams.get("user");

    console.log(token);

    if (!token || !user) {
      return NextResponse.json({ message: "Access Denied" }, { status: 402 });
    }

    await db();

    const resolvedProblems = await params;
    const id = resolvedProblems.id;

    const isLike = req.nextUrl.searchParams.get("isLike");

    const isLikeBoolean = isLike === "true";

    const value = 1;

    const comments = await commentModel.find({ _id: id }, "likes dislikes");

    if (
      comments[0].likes.includes(user) ||
      comments[0].dislikes.includes(user)
    ) {
      return NextResponse.json(
        {
          message: "user has commented",
          ok: comments[0].likes.includes(user),
          notOk: comments[0].dislikes.includes(user),
        },
        { status: 400 },
      );
    }

    if (isLike === "true") {
      const updatedComment = await commentModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: {
            likesCount: value,
          },
          $addToSet: {
            likes: user,
          },
        },
        { new: true, select: "dislikesCount" },
      );

      return NextResponse.json({ isOk: true });
    } else {
      const updatedComment = await commentModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: {
            dislikesCount: value,
          },
          $addToSet: {
            dislikes: user,
          },
        },
        { new: true, select: "likesCount" },
      );

      return NextResponse.json({ isOk: false });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
