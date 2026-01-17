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
          <Providers>{children}</Providers>
        </NextTheme>
      </body>
    </html>
  );
}
