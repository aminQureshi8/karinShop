import { authRouteHandler } from "@/app/utils/auth";
import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;
    const isAdmin = authRouteHandler(token);
    if (!isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    await db();

    const resolvedParams = await params;
    const id = resolvedParams.id;

    await productModel.findOneAndDelete({ _id: id });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 204 },
    );
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
