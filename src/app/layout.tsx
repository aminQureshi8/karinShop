import AuthRefresh from "@/components/module/auth/AuthRefresh";
import "./globals.css";
import { NextTheme } from "./NextTheme";
import Providers from "./redux/Providers";
import { Toaster } from "react-hot-toast";
import TopLoader from "./TopLoader";
import NextTopLoader from "nextjs-toploader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <NextTheme>
            <NextTopLoader color="#3b82f6" height={3} showSpinner={false} />
            <AuthRefresh />
            {children}
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
