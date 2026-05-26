"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
        });

        if (!res.ok) {
          console.error("❌ Token refresh failed");

          if (pathname.startsWith("/admin")) {
            router.push("/regLogin/auth");
          }
        } else {
          console.log("✅ Token refreshed successfully");
          router.refresh();
        }
      } catch (error) {
        console.error("❌ Refresh error:", error);

        if (pathname.startsWith("/admin")) {
          router.push("/regLogin/auth");
        }
      }
    };

    let interval: any;

    if (pathname.startsWith("/admin") || pathname.startsWith("/my-accoount")) {
      refreshToken();
      interval = setInterval(refreshToken, 50000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pathname, router]);

  return null;
}
