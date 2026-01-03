import "./globals.css";
import Providers from "./redux/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="container mx-auto">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
