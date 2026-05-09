import db from "@/config/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { identifier } = await req.json();

    const userFind = await userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!userFind) {
      return NextResponse.json({
        exists: false,
        action: "register",
      });
    }

    return NextResponse.json({
      exists: true,
      action: "login",
    });
  } catch (error) {}
}
