import { generateAccessToken, generateRefreshToken } from "@/app/utils/auth";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    const allUsers = await userModel.countDocuments({});
    const role = allUsers === 0 ? "ADMIN" : "USER";

    const user = await userModel.create({
      email: identifier.includes("@") ? identifier : undefined,
      phone:
        identifier.startsWith("+98") || identifier.startsWith("09")
          ? identifier
          : undefined,
      role,
      password,
    });

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

    return NextResponse.json(
      { message: "User created" },
      { status: 201, headers },
    );
  } catch (error) {}
}
