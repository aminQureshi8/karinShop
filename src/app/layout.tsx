import "./globals.css";
import AuthRefresh from "@/components/module/auth/AuthRefresh";
import { NextTheme } from "./NextTheme";
import { danaMedium, danaLight, danaBold, morabbaReg } from "./fonts";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import Providers from "./redux/Providers";
import { Suspense } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${danaMedium.variable} ${danaLight.variable} ${danaBold.variable} ${morabbaReg.variable}`}
    >
      <body className="bg-gray-50 dark:bg-gray-900">
        <NextTheme>
          <NextTopLoader color="#3b82f6" height={3} showSpinner={false} />
          <Suspense fallback={<div>...</div>}>
            <AuthRefresh />
          </Suspense>
          <Suspense fallback={<div>...</div>}>
            <Providers>{children}</Providers>
          </Suspense>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className:
                "!font-danaMed bg-white !dark:bg-gray-800 !text-black !dark:text-white",
              duration: 3000,
              style: {
                fontSize: "14px",
                fontFamily: "dana",
              },
            }}
          />
        </NextTheme>
      </body>
    </html>
  );
}
