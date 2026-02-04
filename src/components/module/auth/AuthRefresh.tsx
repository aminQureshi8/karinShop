"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpired = () => {
      const tokenExpired = (
        document.querySelector(
          'meta[name="x-token-expired"]',
        ) as HTMLMetaElement
      )?.content;

      console.log(tokenExpired);

      if (tokenExpired === "true") {
        refreshToken();
      }
    };
    const refreshToken = async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
        });

        console.log(response);

        if (!response.ok) {
          router.push("/auth");
        } else {
          router.refresh();
        }
      } catch (error) {
        router.push("/auth");
      }
    };

    const interval = setInterval(async () => {
      if (pathname.startsWith("/admin")) {
        await refreshToken();
      }
    }, 50000);

    checkTokenExpired();

    return () => clearInterval(interval);
  }, [pathname, router]);

  return null;
}
