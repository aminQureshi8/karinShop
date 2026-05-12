import { generateAccessToken, generateRefreshToken } from "@/app/utils/auth";
import db from "@/config/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { identifier, password } = await req.json();

    const user = await userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: "پسورد اشتباهه" }, { status: 401 });
    }

    const accessToken = generateAccessToken({
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      email: user.email,
      phone: user.phone,
    });

    user.refreshToken = refreshToken;
    await user.save();

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true`,
    );

    return NextResponse.json({ message: "logged" }, { status: 201, headers });
  } catch (error) {}
}
