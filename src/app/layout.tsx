import AuthRefresh from "@/components/module/auth/AuthRefresh";
import "./globals.css";
import { NextTheme } from "./NextTheme";
import Providers from "./redux/Providers";

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
          </Providers>
        </NextTheme>
      </body>
    </html>
  );
}
