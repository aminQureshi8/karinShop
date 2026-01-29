import { NextRequest, NextResponse } from "next/server";
import { jwtDecrypt, jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refresh-token")?.value;
  const nextAuth = request.cookies.get("authjs.session-token")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token && !refreshToken && !nextAuth) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (pathname.startsWith("/admin")) {
          if (payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url));
          }
        }

        return NextResponse.next();
      } catch (error) {
        if (refreshToken) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/auth", request.url));
      }
    }

    // if (refreshToken) {
    //   try {
    //     const secret = new TextEncoder().encode(process.env.JWT_SECRET_REFRESH);
    //     await jwtVerify(refreshToken, secret);
    //     return NextResponse.next();
    //   } catch (error) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    //   }
    // }

    if (nextAuth) {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith("/auth")) {
    if (token) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET),
        );
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {}
    }

    if (nextAuth) {
      try {
        await jwtDecrypt(
          nextAuth,
          new TextEncoder().encode(
            process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET!,
          ),
          {
            clockTolerance: 15,
          },
        );

        // ✅ session سالمه → برگرد خونه
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {
        // ❌ session نامعتبر → کاری نکن
      }
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/auth"],
};
