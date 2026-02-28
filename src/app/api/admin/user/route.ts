import db from "@/config/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const page = req.nextUrl.searchParams.get("page") || 1;
    const limit = 5;
    const skip = (Number(page) - 1) * limit;

    const users = await userModel
      .find({}, "-refreshToken -__v")
      .skip(skip)
      .limit(5);

    const totalUsers = await userModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({ users, totalPages });
  } catch (error) {}
}
