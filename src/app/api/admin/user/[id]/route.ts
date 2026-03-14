import db from "@/config/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await userModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {}
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const formData = await req.formData();

    const email = formData.get("email") as string;
    const userName = formData.get("userName") as string;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { email, userName },
      { new: true, runValidators: true }, // new:true returns updated doc, runValidators:true ensures schema rules are checked
    );

    return NextResponse.json({ email, userName });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
