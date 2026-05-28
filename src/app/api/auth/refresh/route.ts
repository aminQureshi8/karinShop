// import { NextRequest, NextResponse } from "next/server";
// import { verify, sign } from "jsonwebtoken";
// import db from "@/config/db";
// import userModel from "@/models/user";

// export async function POST(req: NextRequest) {
//   try {
//     await db();
//     const refreshToken = req.cookies.get("refresh-token")?.value;

   

//     if (!refreshToken)
//       return NextResponse.json({ error: "No token" }, { status: 401 });

//     const payload = verify(refreshToken, process.env.JWT_SECRET_REFRESH!) as {
//       email: string;
//       phone: string;
//     };
   

//     const user = await userModel.findOne({
//       $or: [{ email: payload.email }, { phone: payload.phone }],
//     });

 

//     if (!user || user.refreshToken !== refreshToken) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const newAccessToken = sign(
//       { email: user.email, role: user.role, phone: user.phone },
//       process.env.JWT_SECRET!,
//       { expiresIn: "60s" },
//     );



//     const response = NextResponse.json({
//       success: true,
//       message: "Token refreshed",
//     });
//     response.cookies.set("token", newAccessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
      
//       path: "/",
//       maxAge: 60,
//     });

//     console.log("✅ Cookie set in response"); 

//     return response;
//   } catch (error) {
//     console.error("❌ Error in refresh:", error); 
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }
