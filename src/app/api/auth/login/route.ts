import db from "@/config/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { identifier, password } = await req.json();

    


  } catch (error) {}
}
