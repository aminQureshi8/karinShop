// import { NextRequest, NextResponse } from "next/server";
// import db from "../../../../../config/db";
// import userModel from "../../../../../model/user";

import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../config/db";
import otpModel from "../../../../../model/otp";

// export async function POST(req: NextRequest) {
//   try {
//     await db();
//     const code = 123456; // This should be generated and sent to the user in a real scenario
//     const body = await req.json();
//     const { otpCode, identifier } = body;

//     if (otpCode === code) {
//       // return NextResponse.json({ message: "OTP is valid" }, { status: 200 });

//       const isUserFind = await userModel.findOne({
//         $or: [{ email: identifier }, { phone: identifier }],
//       });

//       if (!isUserFind) {
//         await userModel.create({
//           email: identifier.includes("@") ? identifier : undefined,
//           phone:
//             identifier.startsWith("+98") || identifier.startsWith("09")
//               ? identifier
//               : undefined,
//         });

//         return NextResponse.json(
//           { message: "کاربری با این مشخصات یافت نشد، کاربر جدید ایجاد شد" },
//           { status: 201 },
//         );
//       }
//       return NextResponse.json({ message: "کاربر یافت شد" }, { status: 200 });
//     }
//     if (otpCode !== code) {
//       return NextResponse.json(
//         {
//           message: "کد وارد شده صحیح نمی‌باشد",
//         },
//         { status: 400 },
//       );
//     }
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    await db();

    const { identifier } = await req.json();

    const now = new Date();

    const expTime = now.getTime() + 300_000; // 5 minutes in milliseconds

    const code = 123456; // This should be generated and sent to the user in a real scenario

    await otpModel.create({
      code,
      expTime,
      identifier,
    });

    return NextResponse.json(
      { message: "OTP created successfully" },
      { status: 201 },
    );
  } catch (error) {}
}
