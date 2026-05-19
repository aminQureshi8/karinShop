import db from "@/config/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await db()
    
    } catch (error) {
        
    }
}