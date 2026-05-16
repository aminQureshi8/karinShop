import { NextRequest, NextResponse } from "next/server";
import { verify, sign } from "jsonwebtoken";
import db from "@/config/db";
import userModel from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await db();
    const refreshToken = req.cookies.get("refresh-token")?.value;

    console.log("🔹 refreshToken:", refreshToken); // چک کن وجود داره؟

    if (!refreshToken)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const payload = verify(refreshToken, process.env.JWT_SECRET_REFRESH!) as {
      email: string;
      phone: string;
    };
    console.log("🔹 payload:", payload); // چک کن decode شد؟

    const user = await userModel.findOne({
      $or: [{ email: payload.email }, { phone: payload.phone }],
    });

    console.log("🔹 user found:", !!user); // چک کن کاربر پیدا شد؟
    console.log("🔹 tokens match:", user?.refreshToken === refreshToken); // چک کن توکن‌ها مطابقت دارن؟

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const newAccessToken = sign(
      { email: user.email, role: user.role, phone: user.phone },
      process.env.JWT_SECRET!,
      { expiresIn: "60s" },
    );

    console.log(
      "✅ newAccessToken created:",
      newAccessToken.substring(0, 20) + "...",
    ); // چک کن توکن جدید ساخته شد؟

    const response = NextResponse.json({
      success: true,
      message: "Token refreshed",
    });
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      
      path: "/",
      maxAge: 60,
    });

    console.log("✅ Cookie set in response"); // چک کن cookie تنظیم شد؟

    return response;
  } catch (error) {
    console.error("❌ Error in refresh:", error); // چک کن چه خطایی افتاده
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
