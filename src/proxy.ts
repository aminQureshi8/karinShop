import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refresh-token")?.value;

  if (pathname.startsWith("/my-account")) {
    if (!token && !refreshToken) {
      return NextResponse.redirect(new URL("/register/auth", request.url));
    }

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (pathname.startsWith("/my-account")) {
          if (payload.role !== "USER") {
            return NextResponse.redirect(new URL("/", request.url));
          }
        }

        return NextResponse.next();
      } catch (error) {
        if (refreshToken) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/register/auth", request.url));
      }
    }

    if (refreshToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_REFRESH);
        await jwtVerify(refreshToken, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL("/register/auth", request.url));
      }
    }
  }
  if (pathname.startsWith("/admin")) {
    if (!token || !refreshToken) {
      return NextResponse.redirect(new URL("/register/auth", request.url));
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
        return NextResponse.redirect(new URL("/register/auth", request.url));
      }
    }

    if (refreshToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_REFRESH);
        await jwtVerify(refreshToken, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL("/register/auth", request.url));
      }
    }
  }

  if (pathname.startsWith("/register/auth")) {
    if (token) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET),
        );
        return NextResponse.redirect(new URL("/", request.url));
      } catch (error) {}
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/register/auth", "/my-account/:path*"],
};
