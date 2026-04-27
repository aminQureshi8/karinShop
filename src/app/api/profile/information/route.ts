import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { data, iso } = await req.json();
    const { name, phone, email } = data;

    const findUser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        phone,
        email,
        dateTime: iso,
      },
      {
        new: true,
      },
    );

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: { name },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
