import brandModel from "@/models/brand";
import db from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { authRouteHandler, verifyAccessToken } from "@/app/utils/auth";

export async function POST(req: NextRequest) {
  const isAdmin = authRouteHandler(req.headers.get("Authorization"));

  if (!isAdmin) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  return NextResponse.json({ message: "ok" });
}

export async function GET() {
  try {
    await db();

    const brands = await brandModel.find({}, "-__v").lean();

    return NextResponse.json(brands);
  } catch (error) {}
}
