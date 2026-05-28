import db from "@/config/db";
import banModel from "@/models/ban";
import commentModel from "@/models/comment";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const id = req.nextUrl.searchParams.get("id");
    const commentID = req.nextUrl.searchParams.get("commentID");
    const ban = req.nextUrl.searchParams.get("ban");

    const { banReason } = await req.json();
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication token not found." },
        { status: 401 },
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 },
      );
    }

    const adminEmail = authRouteHandler(token);

    if (!adminEmail) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 },
      );
    }

    const admin = await userModel.findOne({ email: adminEmail }, "_id");
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found." },
        { status: 404 },
      );
    }

    const user = await userModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    if (ban === "true") {
      if (!banReason?.trim()) {
        return NextResponse.json(
          { success: false, message: "Ban reason is required." },
          { status: 400 },
        );
      }
      await commentModel.findByIdAndUpdate(commentID, {
        $set: {
          isBan: true,
        },
      });

      await banModel.create({
        banReason: banReason.trim(),
        user: id,
        bannedBy: admin._id,
      });

      return NextResponse.json(
        {
          success: true,
          message: "User has been successfully banned.",
        },
        { status: 201 },
      );
    } else {
      await commentModel.findByIdAndUpdate(commentID, {
        $set: {
          isBan: false,
        },
      });

      await banModel.findOneAndDelete({ user: id });
      return NextResponse.json(
        {
          success: true,
          message: "User has been unbanned successfully.",
        },
        { status: 200 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
        error: error.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
