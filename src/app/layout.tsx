import AuthRefresh from "@/components/module/auth/AuthRefresh";
import "./globals.css";
import { NextTheme } from "./NextTheme";
import Providers from "./redux/Providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <NextTheme>
          <Providers>
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
          </Providers>
        </NextTheme>
      </body>
    </html>
  );
}
