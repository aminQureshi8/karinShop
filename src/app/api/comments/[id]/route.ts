import db from "@/config/db";
import commentModel from "@/models/comment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; page: string }> },
) {
  try {
    const user = req.nextUrl.searchParams.get("user");

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "USER") {
      return NextResponse.json(
        { message: "Access denied. USER privileges required." },
        { status: 403 },
      );
    }

    const isLikeStr = req.nextUrl.searchParams.get("isLike");
    const isLike = isLikeStr === "true";

    if (!user) {
      return NextResponse.json(
        { message: "User is required" },
        { status: 400 },
      );
    }

    await db();

    const { id } = await params;
    const comments = await commentModel.findById(
      id,
      "likes dislikes likesCount dislikesCount",
    );

    if (!comments) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }

    const hasLiked = comments.likes.includes(user);
    const hasDisliked = comments.dislikes.includes(user);

    let update: any = {};
    let message = "";
    let action = "";

    if (isLike) {
      if (hasLiked) {
        update = {
          $pull: { likes: user },
          $inc: { likesCount: -1 },
        };
        message = "Like removed";
        action = "removed-like";
      } else {
        if (hasDisliked) {
          update = {
            $pull: { dislikes: user },
            $addToSet: { likes: user },
            $inc: { dislikesCount: -1, likesCount: 1 },
          };
          message = "Switched dislike to like";
          action = "switched-to-like";
        } else {
          update = {
            $addToSet: { likes: user },
            $inc: { likesCount: 1 },
          };
          message = "Like added";
          action = "added-like";
        }
      }
    } else {
      if (hasDisliked) {
        update = {
          $pull: { dislikes: user },
          $inc: { dislikesCount: -1 },
        };
        message = "Dislike removed";
        action = "removed-dislike";
      } else {
        if (hasLiked) {
          update = {
            $pull: { likes: user },
            $addToSet: { dislikes: user },
            $inc: { likesCount: -1, dislikesCount: 1 },
          };
          message = "Switched like to dislike";
          action = "switched-to-dislike";
        } else {
          update = {
            $addToSet: { dislikes: user },
            $inc: { dislikesCount: 1 },
          };
          message = "Dislike added";
          action = "added-dislike";
        }
      }
    }

    await commentModel.findByIdAndUpdate(id, update);

    return NextResponse.json({ message, action });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
