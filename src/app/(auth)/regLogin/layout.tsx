import SkeletonAuth from "@/components/loading/SkeletonAuth";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<SkeletonAuth />}>{children}</Suspense>;
}
