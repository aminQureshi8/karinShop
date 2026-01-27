import db from "@/config/db";
import userModel from "@/models/user";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const generateAccessToken = (data: {
  email: string;
  role: string;
  phone: string;
}) => sign(data, process.env.JWT_SECRET!, { expiresIn: "60s" });

export const generateRefreshToken = (data: { email: string }) =>
  sign(data, process.env.JWT_SECRET_REFRESH!, { expiresIn: "15d" });

const verifyAccessToken = (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET!) as {
      email: string;
      role: string;
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") throw error;
    return null;
  }
};

const refreshToken = async () => {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get("refresh-token")?.value;

  if (!refreshTokenValue) throw new Error("No refresh token");

  const payload = verify(refreshTokenValue, process.env.JWT_SECRET_REFRESH!);

  await db();

  const user = await userModel.findOne({
    $or: [{ email: payload.email }, { phone: payload.phone }],
  });

  if (!user || user.refreshToken !== refreshTokenValue) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    email: user.email ? user.email : null,
    phone: user.phone ? user.phone : null,
    role: user.role,
  });

  const response = NextResponse.next();
  response.cookies.set("token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60,
  });

  return { newAccessToken, response, user };
};
