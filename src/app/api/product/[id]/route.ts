import db from "@/config/db";
import productModel from "@/models/product";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await db()

  const productFeatures = await productModel.findById(id).select("features").lean()
}
