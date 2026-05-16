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
            router.push("/auth");
          }
        } else {
          console.log("✅ Token refreshed successfully");
          router.refresh();
        }
      } catch (error) {
        console.error("❌ Refresh error:", error);
        if (pathname.startsWith("/admin")) {
          router.push("/auth");
        }
      }
    };

    // اولین بار بلافاصله refresh کن
    refreshToken();

    // هر 45 ثانیه refresh کن (قبل از 60 ثانیه انقضا)
    const interval = setInterval(refreshToken, 45000);

    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
