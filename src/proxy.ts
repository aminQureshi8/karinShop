import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      pathname.startsWith("/my-account") &&
      token?.role !== "USER" &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/regLogin/auth", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/regLogin/auth",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*"],
};
