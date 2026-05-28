// import { generateAccessToken, generateRefreshToken } from "@/app/utils/auth";
// import db from "@/config/db";
// import userModel from "@/models/user";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt"; // Import bcrypt

// export async function POST(req: NextRequest) {
//   try {
//     await db();

//     const { identifier, password } = await req.json();

//     const user = await userModel.findOne({
//       $or: [{ email: identifier }, { phone: identifier }],
//     });

//     if (!user) {
//       return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
//     }

//     // Compare the provided password with the hashed password
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return NextResponse.json({ message: "پسورد اشتباهه" }, { status: 401 });
//     }

//     // If passwords match, generate tokens and set cookies
//     const accessToken = generateAccessToken({
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//     });

//     const refreshToken = generateRefreshToken({
//       email: user.email,
//       phone: user.phone,
//     });

//     user.refreshToken = refreshToken;
//     await user.save();

//     const response = NextResponse.json({ message: "logged" }, { status: 201 });

//     response.cookies.set("token", accessToken, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60,
//     });

//     response.cookies.set("refresh-token", refreshToken, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60 * 24 * 15,
//     });
//     return response;
//   } catch (error) {
//     // It's good practice to log the error
//     console.error("Login error:", error);
//     return NextResponse.json({ message: "An error occurred" }, { status: 500 });
//   }
// }
