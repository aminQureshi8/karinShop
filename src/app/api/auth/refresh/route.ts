import { NextRequest, NextResponse } from "next/server";
import { verify, sign } from "jsonwebtoken";
import db from "@/config/db";
import userModel from "@/models/user";
// import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    await db();
    const refreshToken = req.cookies.get("refresh-token")?.value;
    const nextAuth = req.cookies.get("authjs.session-token")?.value;

    if (nextAuth) {
      return NextResponse.json({ ok: true, source: "nextauth" });
    }

    if (!refreshToken)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const payload = verify(refreshToken, process.env.JWT_SECRET_REFRESH!) as {
      email: string;
      phone: string;
    };
    const user = await userModel.findOne({
      $or: [{ email: payload.email }, { phone: payload.phone }],
    });

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const newAccessToken = sign(
      { email: user.email, role: user.role, phone: user.phone },
      process.env.JWT_SECRET!,
      { expiresIn: "60s" },
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
