import { authRouteHandler } from "@/app/utils/auth";
import db from "@/config/db";
import brandModel from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    const isAdmin = authRouteHandler(token);

    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await db();
    await brandModel.findOneAndDelete({ _id: id });

    return NextResponse.json(
      { message: "Brand deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
