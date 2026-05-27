import db from "@/config/db";
import brandModel from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();

    const sub = req.nextUrl.searchParams.get("sub");

    const findsBrand = await brandModel.find({ subCategory: sub });

    return NextResponse.json({ findsBrand });
  } catch (error) {}
}
