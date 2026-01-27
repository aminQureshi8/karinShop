import db from "@/config/db";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const body = await req.json();

    const { otpCode, identifier } = body;

    const isOtpExist = await otpModel.findOne({
      identifier,
      code: otpCode,
    });

    if (isOtpExist) {
      const now = Date.now();

      if (isOtpExist.expTime > now) {
        const allUsers = await userModel.find({});
        const role = allUsers.length === 0 ? "ADMIN" : "USER";

        const isUserFind = await userModel.findOne({
          $or: [{ email: identifier }, { phone: identifier }],
        });

        if (!isUserFind) {
          await userModel.create({
            email: identifier.includes("@") ? identifier : undefined,
            phone:
              identifier.startsWith("+98") || identifier.startsWith("09")
                ? identifier
                : undefined,
            role,
          });
        }

        await otpModel.deleteOne({ _id: isOtpExist._id });

        return NextResponse.json({ message: "OTP is valid" }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Code is expired" },
          { status: 410 },
        );
      }
    } else {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 },
    );
  }
}
