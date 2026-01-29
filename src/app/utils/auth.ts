import db from "@/config/db";
import userModel from "@/models/user";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const generateAccessToken = (data: {
  email: string;
  role: string;
  phone: string;
}) => {
  console.log("✅ NEW ACCESS TOKEN GENERATED", Date.now());
  return sign(data, process.env.JWT_SECRET!, { expiresIn: "60s" });
};

export const generateRefreshToken = (data: { email: string; phone: string }) =>
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

  const payload = verify(
    refreshTokenValue,
    process.env.JWT_SECRET_REFRESH!,
  ) as { email: string; phone: string };

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

export const authUser = async () => {
  try {
    await db();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { user: null, response: null };

    let payload;

    try {
      payload = verifyAccessToken(token);
      if (!payload) throw new Error("Invalid token");
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        const { newAccessToken, response, user } = await refreshToken();

        console.log(newAccessToken);
        

        payload = verifyAccessToken(newAccessToken);

        return {
          user: JSON.parse(JSON.stringify(user)),
          response,
        };
      }
      return { user: null, response: null };
    }

    const user = await userModel.findOne(
      { email: payload.email },
      { password: 0, refreshToken: 0 },
    );

    return {
      user: user ? JSON.parse(JSON.stringify(user)) : null,
      response: null,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return { user: null, response: null };
  }
};
