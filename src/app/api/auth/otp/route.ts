import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../config/db";
import userModel from "../../../../../model/user";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const { phoneOrEmail } = body;

    const isUserFind = await userModel.findOne({
      $or: [{ email: phoneOrEmail }, { name: phoneOrEmail }],
    });

    if (!isUserFind) {
      return NextResponse.json(
        { message: "کاربری با این مشخصات یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({isUserFind})
  } catch (error) {
    return NextResponse.json({ error });
  }
}
