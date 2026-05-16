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

    const response = NextResponse.json({ message: "logged" }, { status: 201 });

    response.cookies.set("token", accessToken, {
      httpOnly: true,

     
      path: "/",
      maxAge: 60,
    });

    response.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
     
      path: "/",
      maxAge: 60 * 60 * 24 * 15,
    });
    return response;
  } catch (error) {}
}
