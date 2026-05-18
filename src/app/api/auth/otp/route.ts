import db from "@/config/db";
import otpModel from "@/models/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { identifier } = await req.json();

    const expTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const code = 12345; // This should be generated and sent to the user in a real scenario

    await otpModel.create({
      code,
      expTime,
      identifier,
    });

    return NextResponse.json(
      { message: "OTP created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
