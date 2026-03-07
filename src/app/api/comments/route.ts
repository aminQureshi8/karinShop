import db from "@/config/db";
import commentModel from "@/models/comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { title, isApprove, isOk, user, product, comment  } = await req.json();


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
