import { NextRequest } from "next/server";
import db from "../../../../../../config/db";
import otpModel from "../../../../../../model/otp";
import userModel from "../../../../../../model/user";

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
      const now = new Date();

      if (isOtpExist.expTime > now.getTime()) {
        const allUsers = await userModel.find({});
        const role = allUsers.length === 0 ? "ADMIN" : "USER";

        
      }
    }
  } catch (error) {}
}
