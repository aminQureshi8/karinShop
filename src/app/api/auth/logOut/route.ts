import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out suscessfully" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("refresh-token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
