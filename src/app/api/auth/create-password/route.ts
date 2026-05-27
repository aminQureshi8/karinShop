import userModel from "@/models/user";
import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await db();
    const { identifier, password } = await req.json();

    const isUserReg = await userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (isUserReg) {
      return NextResponse.json(
        { message: "این کاربر قبلاً ثبت‌نام کرده است" },
        { status: 409 },
      );
    }

    const allUsers = await userModel.countDocuments({});
    const role = allUsers === 0 ? "ADMIN" : "USER";

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await userModel.create({
      email: identifier.includes("@") ? identifier : undefined,
      phone: !identifier.includes("@") ? identifier : undefined,
      role,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
