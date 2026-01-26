import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../config/db";

export async function POST(req: NextRequest) {
 try {
    await db()
    const body = await req.json()
    const {phoneOrEmail} = body

    


 } catch (error) {
    
 }
}
