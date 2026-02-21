import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { title, isApprove, isOk, comment, user, product } = await req.json();

    console.log(title, isApprove, isOk, comment, user, product);

    await commentModel.create({
      title,
      isApprove,
      isOk,
      comment,
      user,
      product,
    });

    return NextResponse.json({ message: "Comment Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 201 });
  }
}
