"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";
import "nprogress/nprogress.css";
export default function TopLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  useEffect(() => {
    NProgress.start();
  }, []);

  return null;
}
