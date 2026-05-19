import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await db();

    const resolvedParams = await params;
    const id = resolvedParams.id;

    const isAccept = req.nextUrl.searchParams.get("isAccept")

    if (isAccept === "true") {
      await commentModel.findByIdAndUpdate(id, {
        $set: {
          isApproved: true,
        },
      });

      return NextResponse.json({ message: "Comment approved successfully." });
    } else {
      await commentModel.findByIdAndUpdate(id, {
        $set: {
          isApproved: false,
        },
      });

      return NextResponse.json({ message: "Comment rejected successfully." });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Server error while updating comment",
        error: error?.message ?? "unknown",
      },
      { status: 500 },
    );
  }
}
