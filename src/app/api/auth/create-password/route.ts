import { generateAccessToken, generateRefreshToken } from "@/app/utils/auth";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    const allUsers = await userModel.countDocuments({});
    const role = allUsers === 0 ? "ADMIN" : "USER";

    const isUserReg = await userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (isUserReg) {
      return NextResponse.json(
        { message: "userLogged already" },
        { status: 402 },
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModel.create({
      email: identifier.includes("@") ? identifier : undefined,
      phone:
        identifier.startsWith("+98") || identifier.startsWith("09")
          ? identifier
          : undefined,
      role,
      password: hashedPassword,
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
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
