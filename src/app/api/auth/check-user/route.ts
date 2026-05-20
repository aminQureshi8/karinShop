import db from "@/config/db";
import banModel from "@/models/ban";
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
    const findUserinBans = await banModel.findOne({ user: userFind._id });

    if (findUserinBans) {
      return NextResponse.json(
        { message: "Your account has been banned." },
        { status: 403 },
      );
    }

    return NextResponse.json({
      exists: true,
      action: "login",
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
