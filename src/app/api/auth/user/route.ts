import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../config/db";
import userModel from "../../../../../model/user";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const { phoneOrEmail } = body;

    const isUserFind = await userModel.findOne({
      $or: [{ email: phoneOrEmail }, { phone: phoneOrEmail }],
    });

    if (!isUserFind) {
      await userModel.create({
        email: phoneOrEmail.includes("@") ? phoneOrEmail : undefined,
        phone:
          phoneOrEmail.startsWith("+98") || phoneOrEmail.startsWith("09")
            ? phoneOrEmail
            : undefined,
      });
      return NextResponse.json(
        {
          message: "کاربری با این مشخصات یافت نشد، کاربر جدید ایجاد شد",
        },
        {
          status: 201,
        },
      );
    }

    return NextResponse.json({ message: "کاربر یافت شد" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
